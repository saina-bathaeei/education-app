import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2'
import Input from '../../../components/input/Input'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
//import FroalaEditor from 'react-froala-wysiwyg' 

export default function ArticlesAdmin() {

  const [articles,setArticles] = useState([])
  const [allCategory,setAllCategory] = useState([])
  const [cover,setCover] = useState('')
  const [title,setTitle] = useState('')
  const [desc,setDesc] = useState('')
  const [body,setBody] = useState('')
  const [shortName,setShortName] = useState('')
  const [categoryID,setCategoryID] = useState('')
  const [draftGo,setDraftGo] = useState('')

  const navigate = useNavigate()



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
        } catch (err) {
          console.log(err)
        } 
      };
      fetchData();
  },[])

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
      setTitle(s)
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
  const draftArticle = () => {
    const formData = new FormData();

    formData.append('title' , title)
    formData.append('description' , desc)
    formData.append('shortName' , shortName)
    formData.append('categoryID' , categoryID)
    formData.append('cover' , cover)
    formData.append('body', body)

    console.log(formData)

    let localStorageData = JSON.parse(localStorage.getItem('user'))


      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/articles/draft`,{
          method: 'POST',
          headers: {
          Authorization: `Bearer ${localStorageData.token}`,
          },
          body: formData, 
      }).then(res => console.log(res))
  }

  const rewriteDraft =  (e) => {
    let linkDraft = e.target.parentElement.parentElement.childNodes[2].innerHTML

    navigate(`draft/${linkDraft}`)
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
              <Input
               type="text" 
               placeholder={`لطفا عنوان را وارد کنید...`}
               className='inp'
               element='input'
               id='title'
               onState={stateRecogonizer}
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
          <button style={{marginRight:'20px'}} className="add-user-btn" onClick={() => draftArticle()}>پیش نویس</button>
        </div>

    <DataTable title="پیام ها">
        
        <table class="table" style={{width:'100%',borderSpacing: '5px 20px'}}>
          <thead>
            <tr>
              <th style={{width:'5%'}}>شناسه</th>
              <th style={{width:'20%'}}>نام و نام خانوادگی</th>
              <th style={{width:'20%'}}>لینک</th>
              <th style={{width:'10%'}}>متن</th>
              <th style={{width:'10%'}}>تکمیل شده</th>
              <th style={{width:'5%'}}>حذف</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((con, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{con.title}</td>
                <td>{con.shortName}</td>
                <td>
                    <button type="button" class="btn btn-primary edit-btn" onClick={(e) => showText(e)}>
                      مشاهده متن
                    </button>
                </td>

            {
              con.publish === 1 ? (
                <td>
                    <img src="/images/icons/mdi--tick (1).svg" alt="" />
                </td>
              ) : (
                <td>
                  <button type="button" class="btn btn-primary edit-btn" onClick={(e) => rewriteDraft(e)}>
                     تکمیل کن
                  </button>
                </td>
              )
            }
                <td>
                  <button type="button" class="btn btn-danger delete-btn" onClick={(e) => deleteArticles(event)}>
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
    
  )
}
