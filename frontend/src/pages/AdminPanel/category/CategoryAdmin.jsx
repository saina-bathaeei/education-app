import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2'
import Input from '../../../components/input/Input'

export default function CategoryAdmin() {

  const [category,setCategory] = useState([])
  const [name,setName] = useState('')
  const [title,setTitle] = useState('')

  useEffect(() => {
    getAllCategory()
  },[])

  const getAllCategory = () => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/category`)
      .then(res => res.json())
      .then(data => setCategory(data))
  }

  const addNewCategory = () => {

    let categoryInfo = {
      name,
      title
    }

    console.log(categoryInfo)

    let localStorageData = JSON.parse(localStorage.getItem('user'))

    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/category`,{
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
        'Content-Type' : 'application/json' ,
      },
      body: JSON.stringify(categoryInfo)
    }).then(res => console.log(res))
  }

  const deleteCategory = (e) => {
    let emailOfUser = e.target.parentElement.parentElement.childNodes[1].innerHTML

    let found = category.find((cate) => cate.title === emailOfUser)

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
      title: "آیا میخواهید این دسته بندی را حذف کنید؟",
      text: "این دسته بندی قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله پاکش کن!",
      cancelButtonText: "نه کنسلش کن!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "حذف شد",
          text: "دسته بندی شما حذف شده است.",
          icon: "success"
        });

        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/category/${found._id}`,{
          method:'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => console.log(res))

        getAllCategory()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "کنسل شد",
          text: "دسته بندی شما امن است :)",
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

  console.log(category)
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
                         placeholder={`لطفا عنوان را وارد کنید...`}
                         className='inp'
                         element='input'
                         id="name"
                         onState={stateRecogonizer}
                         />
                    </div>
        </div>
          <button className="add-user-btn" onClick={() => addNewCategory()}>افزودن</button>
        </div>

      <DataTable title="دسته بندی ها">
        
        <table class="table" style={{width:'100%',borderSpacing: '5px 20px'}}>
          <thead>
            <tr>
              <th style={{width:'10%'}}>شناسه</th>
              <th style={{width:'60%'}}>عنوان</th>
              <th style={{width:'15%'}}>ویرایش</th>
              <th style={{width:'15%'}}>حذف</th>
            </tr>
          </thead>
          <tbody>
            {
              category.map((i,index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{i.title}</td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger delete-btn" onClick={(e) => deleteCategory(e)}>
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
