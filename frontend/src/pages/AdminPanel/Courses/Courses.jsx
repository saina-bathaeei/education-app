import React, { useEffect, useState } from 'react'
//import './panel.css'
import '/src/pages/AdminPanel/panel.css'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import AddForm from '../../../components/AdminPanel/AddForm/AddForm'
import Input from '../../../components/input/Input'
import Swal from 'sweetalert2'


export default function CoursesAdmin() {

  const [courses,setCourses] = useState([])
  const [allCategory,setAllCategory] = useState([])
  const [title,setTitle] = useState('')
  const [price,setPrice] = useState('')
  const [status,setStatus] = useState('')
  const [link,setLink] = useState('')
  const [category,setCategory] = useState('')
  const [desc,setDesc] = useState('')
  const [photo,setPhoto] = useState('')

  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses`);
        if (!response1.ok) throw new Error('First request failed');
        
        const json1 = await response1.json();
        const response2 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/category`);
        
        if (!response2.ok) throw new Error('Second request failed');
        
        const json2 = await response2.json();
        setCourses(json1);
        setAllCategory(json2);
      } catch (err) {
        console.log(err)
      } 
    };
    fetchData();

  }, []);


  const getAllCourses = () => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses`)
      .then(res => res.json())
      .then(data => setCourses(data))
  }

  const getAllCategory = () => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/category`)
    .then(res => res.json())
    .then(data => setCourses(data))
  }


    const stateRecogonizer = (e,s) => {
    
        if(e.target.id === 'title'){
          setTitle(s)
        }else if(e.target.id === 'price'){
          setPrice(s)
        }else if(e.target.id === 'status'){
          setStatus(s)
        }else if(e.target.id === 'link'){
          setLink(s)
        }else if(e.target.id === 'desc'){
          setDesc(s)
        }
      }

      const addCourse = () => {
        

          const formData = new FormData();

          formData.append('name' , title)
          formData.append('description' , desc)
          formData.append('shortName' , link)
          formData.append('categoryID' , category)
          formData.append('price' , price)
          formData.append('status' , 'start')
          formData.append('cover' , photo)

          console.log(formData)

          let localStorageData = JSON.parse(localStorage.getItem('user'))


            fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses`,{
                method: 'POST',
                headers: {
                Authorization: `Bearer ${localStorageData.token}`,
                },
                body: formData, 
            }).then(res => console.log(res))
      }

      const getCategoryCourse = (e) => {
        setCategory(e.target.value)
      }

      const deleteCourse = (e) => {
        let emailOfUser = e.target.parentElement.parentElement.childNodes[1].innerHTML

        let found = courses.find((con) => con.name === emailOfUser)

        let localStorageData = JSON.parse(localStorage.getItem('user'))


        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "آیا میخواهید این  دوره را حذف کنید؟",
          text: "این دوره قابل بازگشت نیست!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "بله پاکش کن!",
          cancelButtonText: "نه کنسلش کن!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: "حذف شد",
              text: " دوره شما حذف شده است.",
              icon: "success"
            });

            fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses/${found._id}`,{
              method:'DELETE',
              headers: {
                Authorization: `Bearer ${localStorageData.token}`,
              },
            }).then((res) => console.log(res))

            getAllCourses()
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "کنسل شد",
              text: " دوره شما امن است :)",
              icon: "error"
            });
          }
        });
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
                  مبلغ
              </label>
              <Input
               type="text" 
               placeholder={`لطفا مبلغ را وارد کنید...`}
               className='inp'
               element='input'
               id='price'
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
                <option onClick={(e) => getCategoryCourse(e)} value={i._id}>{i.title}</option>
              ))
            }
          </select>

            
            <input  type="file"  onChange={(e) => {
              console.log(e.target.files[0])
              setPhoto(e.target.files[0])
              }}/>
 
              <div className="radio-group">
                <div className="radio-option">
                  <input 
                    type="radio" 
                    id="html" 
                    name="fav_language" 
                    value="start"
                    checked={selectedLanguage === 'در حال برگزاری'}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  />
                  <label htmlFor="html">در حال برگزاری</label>
                </div>

                <div className="radio-option">
                  <input 
                    type="radio" 
                    id="css" 
                    name="fav_language" 
                    value="persell"
                    checked={selectedLanguage === 'پیش فروش'}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  />
                  <label htmlFor="css">پیش فروش</label>
                </div>
              </div>  
        </div>
          <button className="add-user-btn" onClick={() => addCourse()}>افزودن</button>
        </div>

    <DataTable title="دوره ها">
        
        <table class="table" style={{width:'100%',borderSpacing: '5px 20px'}}>
          <thead>
            <tr>
              <th style={{width:'5%'}}>شناسه</th>
              <th style={{width:'20%'}}>عنوان</th>
              <th style={{width:'5%'}}>مبلغ</th>
              <th style={{width:'7%'}}>وضعیت</th>
              <th style={{width:'7%'}}>لینک</th>
              <th style={{width:'10%'}}>مدرس</th>
              <th style={{width:'10%'}}>دسته بندی</th>
              <th style={{width:'4%'}}>ویرایش</th>
              <th style={{width:'4%'}}>حذف</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>{course.price === 0 ? 'رایگان' : course.price}</td>
                <td>{course.isComplete === 0 ? 'در حال برگذاری' : "تمام شده"}</td>
                <td>{course.shortName}</td>
                <td>{course.creator}</td>
                {
                console.log(course)
                  
                }
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn" onClick={(e) => deleteCourse(event)}>
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
