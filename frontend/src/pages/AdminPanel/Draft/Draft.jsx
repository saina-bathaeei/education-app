import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2'
import Input from '../../../components/input/Input'
import { useParams } from 'react-router-dom'
//import FroalaEditor from 'react-froala-wysiwyg' 

export default function Draft() {

    const linkDraft = useParams()

  const [articles,setArticles] = useState([])
  const [allCategory,setAllCategory] = useState([])
  const [cover,setCover] = useState('')
  const [title,setTitle] = useState('')
  const [desc,setDesc] = useState('')
  const [body,setBody] = useState('')
  const [shortName,setShortName] = useState('')
  const [categoryID,setCategoryID] = useState('')
  const [foundItem,setFoundItem] = useState('')

  const [savedCover,setSavedCover] = useState('')
  const [savedTitle,setSavedTitle] = useState('')



  //console.log(found)

  useEffect(() => {

      const fetchData = async () => {
        try {
          const response1 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/articles`);
          if (!response1.ok) throw new Error('First request failed');
          
          const json1 = await response1.json();
          const response2 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/category`);
          
          if (!response2.ok) throw new Error('Second request failed');
          
          const json2 = await response2.json();
          setArticles(json1);
          setAllCategory(json2);
          let found = json1.find((con) => con.shortName === linkDraft.shortName)
          console.log(found)
          setTitle(foundItem.title)

          setFoundItem(found)
        } catch (err) {
          console.log(err)
        } 
      };
      fetchData();
  },[])

  //setSavedTitle(found.title)



  const showText = (e) => {
    let emailOfUser = e.target.parentElement.parentElement.childNodes[1].innerHTML

    let found = articles.find((con) => con.title === emailOfUser)

    console.log(found.body)

    Swal.fire(found.body);
  }

  const deleteArticles = (e) => {
    let emailOfUser = e.target.parentElement.parentElement.childNodes[2].innerHTML

        let found = articles.find((con) => con.shortName === emailOfUser)

        console.log(found._id)

        let localStorageData = JSON.parse(localStorage.getItem('user'))


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "آیا میخواهید این  مقاله را حذف کنید؟",
      text: "این مقاله قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله پاکش کن!",
      cancelButtonText: "نه کنسلش کن!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "حذف شد",
          text: " مقاله شما حذف شده است.",
          icon: "success"
        });

        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/articles/${found._id}`,{
          method:'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => console.log(res))

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "کنسل شد",
          text: " مقاله شما امن است :)",
          icon: "error"
        });
      }
    });
  }

  const stateRecogonizer = (e,s) => {
    
    if(e.target.id === 'title'){
      setTitle(foundItem.title)
    }else if(e.target.id === 'body'){
      setBody(s)
    }else if(e.target.id === 'link'){
      setShortName(s)
    }else if(e.target.id === 'categoryID'){
      setCategoryID(s)
    }else if(e.target.id === 'desc'){
      setDesc(s)
    }
  }

  const getCategory = (e) => {
    setCategoryID(e.target.value)
  }

  const addArticle = () => {
        

    const formData = new FormData();

    formData.append('title' , title)
    formData.append('description' , desc)
    formData.append('shortName' , shortName)
    formData.append('categoryID' , categoryID)
    formData.append('cover' , cover)
    formData.append('body', body)

    console.log(formData)

    let localStorageData = JSON.parse(localStorage.getItem('user'))


      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/articles`,{
          method: 'POST',
          headers: {
          Authorization: `Bearer ${localStorageData.token}`,
          },
          body: formData, 
      }).then(res => console.log(res))
}

  const loadAdd = (e) => {
      setTitle((prevTitle) => {
        const newValue = foundItem.title + e.target.value; // Or another merge logic
        return newValue
      });
      console.log(title)
  }
 

  return (
    <>
    
    <div className="add-new-user">
        <h1>افزودن</h1>
        <div className="input-container-add">
          <div className="input-add">
              <label className="input-title">
                  عنوان
              </label>
              <input
               type="text" 
               placeholder={`لطفا عنوان را وارد کنید...`}
               className='inp'
               id='title'
               value={title}
               onChange={loadAdd}
               
               />
          </div>

          <div className="input-add">
              <label className="input-title">
                  لینک
              </label>
              <Input
               type="text" 
               placeholder={`لطفا لینک را وارد کنید...`}
               className='inp'
               element='input'
               id='link'
               onState={stateRecogonizer}
               />
          </div>

          <div className="input-add">
              <label className="input-title">
                  توضیحات
              </label>
              <Input
               type="text" 
               placeholder={`لطفا توضیحات را وارد کنید...`}
               className='inp'
               element='input'
               id='desc'
               onState={stateRecogonizer}
               />
          </div>

          <select name="category" id="category">
            {
              allCategory.map((i) => (
                <option onClick={(e) => getCategory(e)} value={i._id}>{i.title}</option>
              ))
            }
          </select>

          <input  type="file"  onChange={(e) => {
            console.log(e.target.files[0])
            setCover(e.target.files[0])
          }}/>


        <Input
          className="comments__content-textarea article-textarea"
          element='textarea'
          placeholder=''
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
        </div>
          <button className="add-user-btn" onClick={() => addArticle()}>افزودن</button>
        </div>
    </>
    
  )
}

