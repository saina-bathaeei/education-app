import React,{ useEffect, useState } from "react";
import Input from "../../components/input/Input";
import { useParams } from "react-router-dom";

import "./CommentsTextArea.css";

export default function CommentsTextArea(props) {

  let tokenToAc = JSON.parse(localStorage.getItem('user'))


  const nameC = useParams()
  const [textAreaVal,setTextAreaVal] = useState('')
  const [allComments,setAllComment] = useState([])
  const [score,setScore] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/comments`)
      .then(res => res.json())
      .then(data => setAllComment(data))
  },[])


  const sendComment = () => {
    if (props.abbleToComment){
      ///
    }

    let commentData = {
      body: textAreaVal,
      courseShortName: nameC.courseName,
      score: +score
    }

    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/comments`,{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json' ,
        Authorization : `Bearer ${tokenToAc.token}`
      },
      body: JSON.stringify(commentData)
    }) .then(res => res.json())
    .then(data => console.log(data))
  }

  const commentSetBody = (e) => {
    setTextAreaVal(e.target.value)
  }

  const seSorce = (sc) => {
    setScore(sc)
  }


  return (
    <div className="comments">
      <span className="comments__title">دیدگاهتان را بنویسید</span>
      <span className="comments__text">
        بخش های موردنیاز علامت گذاری شده اند *
      </span>
      <div className="comments_content">
        <select name="score" id="score">
            <option onClick={(e) => seSorce(e.target.value)} value="-1">لطفا یکی از امتیاز ها رو انتخاب کنید</option>
            <option onClick={(e) => seSorce(e.target.value)} value="5">عالی</option>
            <option onClick={(e) => seSorce(e.target.value)} value="4">خیلی خوب</option>
            <option onClick={(e) => seSorce(e.target.value)} value="3">خوب</option>
            <option onClick={(e) => seSorce(e.target.value)} value="2">ضعیف</option>
            <option onClick={(e) => seSorce(e.target.value)} value="1">بد</option>
          </select>
        <span className="comments__content-title">دیدگاه *</span>
        <Input
          className="comments__content-textarea"
          element='textarea'
          placeholder=''
          onChange={commentSetBody}
          value={textAreaVal}
        />
      </div>
      <button type="submit" className="comments__button" onClick={() => sendComment()}>
        فرستادن دیدگاه
      </button>
    </div>
  );
}
