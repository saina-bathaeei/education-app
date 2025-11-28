import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Input from '../../../components/input/Input'
import Swal from 'sweetalert2'

export default function Sessions() {

    const [sessions,setSessions] = useState([])
    const [title,setTitle] = useState('')
    const [time,setTime] = useState('')
    const [course,setCourse] = useState('')
    const [film,setFilm] = useState('')
    const [courses,setCourses] = useState([])
    const [free,setFree] = useState('')

    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses/sessions`)
            .then(res => res.json())
            .then(data => setSessions(data))

        const fetchData = async () => {
            try {
              const response1 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses`);
              if (!response1.ok) throw new Error('First request failed');
            
              const json1 = await response1.json();
              const response2 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses/sessions`);
            
              if (!response2.ok) throw new Error('Second request failed');
            
              const json2 = await response2.json();
              setCourses(json1);
              setSessions(json2);
            } catch (err) {
              console.log(err)
            } 
          };
          fetchData();
    },[])

    const stateRecogonizer = (e,s) => {
    
        if(e.target.id === 'title'){
          setTitle(s)
        }else if(e.target.id === 'time'){
          setTime(s)
        }
      }

    const getCategoryCourse = (e) => {
      setCourse(e.target.value)
    }



    const addCourse = () => {
        

        const formData = new FormData();

        formData.append('title' , title)
        formData.append('time' , time)
        formData.append('free' , free)
        formData.append('video' , film)

        console.log(formData)

        let localStorageData = JSON.parse(localStorage.getItem('user'))


          fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses/${course}/sessions`,{
              method: 'POST',
              headers: {
              Authorization: `Bearer ${localStorageData.token}`,
              },
              body: formData, 
          }).then(res => console.log(res))
    }

    const deleteSession = (e) => {
      let emailOfUser = e.target.parentElement.parentElement.childNodes[1].innerHTML

        let found = sessions.find((con) => con.title === emailOfUser)

        console.log(found)

        let localStorageData = JSON.parse(localStorage.getItem('user'))


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "آیا میخواهید این جلسه را حذف کنید؟",
      text: "این جلسه قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله پاکش کن!",
      cancelButtonText: "نه کنسلش کن!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "حذف شد",
          text: " جلسه شما حذف شده است.",
          icon: "success"
        });

        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses/sessions/${found._id}`,{
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
          text: " جلسه شما امن است :)",
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
                  مدت زمان
              </label>
              <Input
               type="text" 
               placeholder={`لطفا زمان را وارد کنید...`}
               className='inp'
               element='input'
               id='time'
               onState={stateRecogonizer}
               />
          </div>

          <select name="category" id="category" className='selectSess'>
            {
              courses.map((i) => (
                <option onClick={(e) => getCategoryCourse(e)} value={i._id}>{i.name}</option>
              ))
            }
          </select>

          <select name="category" id="category">
            <option onClick={(e) => setFree(e.target.value)} value={0}>غیر رایگان</option>
            <option onClick={(e) => setFree(e.target.value)} value={1}>رایگان</option>
          </select>
  
            <input  type="file"  onChange={(e) => {
              console.log(e.target.files[0])
              setFilm(e.target.files[0])
              }}/>
        </div>
          <button className="add-user-btn" onClick={() => addCourse()}>افزودن</button>
        </div>

    <DataTable title="دوره ها">
        
        <table class="table" style={{width:'100%',borderSpacing: '5px 20px'}}>
          <thead>
            <tr>
              <th style={{width:'5%'}}>شناسه</th>
              <th style={{width:'20%'}}>عنوان</th>
              <th style={{width:'20%'}}>دوره</th>
              <th style={{width:'20%'}}>زمان</th>
              <th style={{width:'10%'}}>ویرایش</th>
              <th style={{width:'10%'}}>حذف</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((ses, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{ses.title}</td>
                <td>{ses.time}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn" onClick={(e) => deleteSession(event)}>
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
