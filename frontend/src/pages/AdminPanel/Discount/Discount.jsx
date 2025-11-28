import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Input from '../../../components/input/Input'
import Swal from 'sweetalert2'


export default function Discount() {

    let localStorageData = JSON.parse(localStorage.getItem('user'))

    const [offs,setOffs] = useState([])
    const [courses,setCourses] = useState([])

    const [code,setCode] = useState('')
    const [percent,setPercent] = useState('')
    const [courseID,setCourceID] = useState('')
    const [max,setMax] = useState('')

    

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response1 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses`);
              if (!response1.ok) throw new Error('First request failed');
              
              const json1 = await response1.json();
              const response2 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/offs`,{
                headers:{
                    Authorization: `Bearer ${localStorageData.token}`
                }
              });
              
              if (!response2.ok) throw new Error('Second request failed');
              
              const json2 = await response2.json();
              setCourses(json1);
              setOffs(json2);
            } catch (err) {
              console.log(err)
            } 
          };
          fetchData();
    },[])

    const getCourse = (e) => {
        setCourceID(e.target.value)
    }

    const stateRecogonizer = (e,s) => {
    
        if(e.target.id === 'code'){
          setCode(s)
        }else if(e.target.id === 'percent'){
          setPercent(s)
        }else if(e.target.id === 'max'){
          setMax(s)
        }
      }

    const addOff = () => {
        //let localStorageData = JSON.parse(localStorage.getItem('user'))

        let offInfo = {
            code,
            percent,
            course: courseID,
            max,
        }


        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/offs`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json' ,
                Authorization: `Bearer ${localStorageData.token}`,
            },
            body: JSON.stringify(offInfo), 
        }).then(res => console.log(res))
    }

    const deleteOff = (e) => {
        let emailOfUser = e.target.parentElement.parentElement.childNodes[1].innerHTML

        let found = offs.find((con) => con.code === emailOfUser)


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

            fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/offs/${found._id}`,{
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
                  کد
              </label>
              <Input
               type="text" 
               placeholder={`لطفا کد را وارد کنید...`}
               className='inp'
               element='input'
               id='code'
               onState={stateRecogonizer}
               />
          </div>

          <div className="input-add">
              <label className="input-title">
                  درصد تخفیف
              </label>
              <Input
               type="text" 
               placeholder={`لطفا درصد تخفیف را وارد کنید...`}
               className='inp'
               element='input'
               id='percent'
               onState={stateRecogonizer}
               />
          </div>

          <div className="input-add">
              <label className="input-title">
                  تعداد مجاز استفاده
              </label>
              <Input
               type="text" 
               placeholder={`لطفا تعداد را وارد کنید...`}
               className='inp'
               element='input'
               id='max'
               onState={stateRecogonizer}
               />
          </div>


          <select name="category" id="category">
            {
              courses.map((i) => (
                <option onClick={(e) => getCourse(e)} value={i._id}>{i.name}</option>
              ))
            }
          </select>            
        </div>
          <button className="add-user-btn" onClick={() => addOff()}>افزودن</button>
        </div>


        <DataTable title="تخفیف ها">
        
        <table class="table" style={{width:'100%',borderSpacing: '5px 20px'}}>
          <thead>
            <tr>
              <th style={{width:'5%'}}>شناسه</th>
              <th style={{width:'20%'}}>کد</th>
              <th style={{width:'10%'}}>درصد تخفیف</th>
              <th style={{width:'10%'}}>تعداد استفاده</th>
              <th style={{width:'20%'}}>درست شده توسط</th>
              <th style={{width:'4%'}}>حذف</th>
            </tr>
          </thead>
          <tbody>
            {offs.map((off, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{off.code}</td>
                <td>{off.percent}</td>
                <td>{off.max}</td>
                <td>{off.creator}</td>
                {
                console.log(off)
                  
                }
                <td>
                  <button type="button" class="btn btn-danger delete-btn" onClick={(e) => deleteOff(e)}>
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
