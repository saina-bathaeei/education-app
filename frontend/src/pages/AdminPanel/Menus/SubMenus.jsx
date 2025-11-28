import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2'
import Input from '../../../components/input/Input'

export default function SubMenus() {

  const [menus,setMenus] = useState([])
  const [submenus,setSubmenus] = useState([])
  const [name,setName] = useState('')
  const [title,setTitle] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/menus`)
      .then(res => res.json())
      .then(data => setMenus(data)) 
  },[])

  const showSubMenus = () => {

    menus.map(menu => (
      
      setSubmenus(menu)
      
    ))

    

    //Swal.fire(menus[0])
  }

  const addNewMenu = () => {

    let menuInfo = {
      title,
      href: name
    }

    console.log(menuInfo)

    let localStorageData = JSON.parse(localStorage.getItem('user'))

    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/menus/`,{
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
        'Content-Type' : 'application/json' ,
      },
      body: JSON.stringify(menuInfo)
    }).then(res => console.log(res))
  }

  const deleteMenu = (e) => {
    let emailOfUser = e.target.parentElement.parentElement.childNodes[1].innerHTML

    let found = menus.find((cate) => cate.title === emailOfUser)

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
      title: "آیا میخواهید این منو را حذف کنید؟",
      text: "این منو قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله پاکش کن!",
      cancelButtonText: "نه کنسلش کن!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "حذف شد",
          text: " منوی شما حذف شده است.",
          icon: "success"
        });

        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/menus/${found._id}`,{
          method:'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => console.log(res))

        //getAllCategory()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "کنسل شد",
          text: "منوی شما امن است :)",
          icon: "error"
        });
      }
    });
  }

  const stateRecogonizer = (e,s) => {
    console.log(e.target.value)

    if(e.target.id === 'title'){
      setTitle(s)
    }else if (e.target.id === 'name'){
      setName(s)
    }
  }

  const getCategoryCourse = (e) => {
    setCategory(e.target.value)
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
               id="title"
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
               id="name"
               onState={stateRecogonizer}
               />
          </div>
          <select name="category" id="category">
            {
              menus.map((i) => (
                <option onClick={(e) => getMenu(e)} value={i._id}>{i.title}</option>
              ))
            }
          </select>
        </div>
        <button className="add-user-btn" onClick={() => addNewMenu()}>افزودن</button>
      </div>

      <DataTable title="دسته بندی ها">
        
        <table class="table" style={{width:'100%',borderSpacing: '5px 20px'}}>
          <thead>
            <tr>
              <th style={{width:'10%'}}>شناسه</th>
              <th style={{width:'30%'}}>عنوان</th>
              <th style={{width:'30%'}}>لینک</th>
              <th style={{width:'20%'}}>ویرایش</th>
              <th style={{width:'20%'}}>حذف</th>
            </tr>
          </thead>
          <tbody>
            {
              menus.map((i,index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{i.title}</td>
                  <td>{i.href}</td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn" onClick={() => showSubMenus()}>
                      ساب منو ها
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger delete-btn" onClick={(e) => deleteMenu(e)}>
                      حذف
                    </button>
                  </td>
                </tr>
              ))
            }
              
            
          </tbody>
        </table>
      </DataTable>
    </>
  )
}
