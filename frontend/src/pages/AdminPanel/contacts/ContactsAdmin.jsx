import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2'

export default function ContactsAdmin() {

    const [contacts,setContacts] = useState([])

    useEffect(() => {
        getAllContacts()
    },[])

    const getAllContacts = () => {
        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/contact`)
            .then(res => res.json())
            .then(data => setContacts(data))
    }

    const showText =  (e) => {
        let emailOfUser = e.target.parentElement.parentElement.childNodes[1].innerHTML

        let found = contacts.find((con) => con.name === emailOfUser)

        console.log(found.body)

        Swal.fire(found.body);
    }

    const deleteContact = (e) => {
        let emailOfUser = e.target.parentElement.parentElement.childNodes[1].innerHTML

        let found = contacts.find((con) => con.name === emailOfUser)

        console.log(found._id)

        Swal.fire(found._id);

        let localStorageData = JSON.parse(localStorage.getItem('user'))


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "آیا میخواهید این  پیام را حذف کنید؟",
      text: "این پیام قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله پاکش کن!",
      cancelButtonText: "نه کنسلش کن!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "حذف شد",
          text: " پیام شما حذف شده است.",
          icon: "success"
        });

        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/contact/${found._id}`,{
          method:'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => console.log(res))

        getAllContacts()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "کنسل شد",
          text: " پیام شما امن است :)",
          icon: "error"
        });
      }
    });
    }

    const answerText = (e) => {

        let answerEmail = {
            email:'j.bathaee@gmail.com',
            answer:'سلام اینم از جواب'
        }

        let localStorageData = JSON.parse(localStorage.getItem('user'))


        console.log(e)
        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/contact/answer`,{
            method:'POST',
            headers:{
                Authorization: `Bearer ${localStorageData.token}`,
                'Content-Type' : 'application/json' ,
            },
            body: JSON.stringify(answerEmail)
        }).then(res => console.log(res)) 
    }

  return (
    <>
        <DataTable title="پیام ها">
        
        <table class="table" style={{width:'100%',borderSpacing: '5px 20px'}}>
          <thead>
            <tr>
              <th style={{width:'5%'}}>شناسه</th>
              <th style={{width:'20%'}}>نام و نام خانوادگی</th>
              <th style={{width:'20%'}}>ایمیل</th>
              <th style={{width:'15%'}}>شماره همراه</th>
              <th style={{width:'10%'}}>متن</th>
              <th style={{width:'5%'}}>پاسخ</th>
              <th style={{width:'5%'}}>حذف</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((con, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{con.name}</td>
                <td>{con.email}</td>
                <td>{con.phone}</td>
                <td>
                    <button type="button" class="btn btn-primary edit-btn" onClick={(e) => showText(e)}>
                      مشاهده متن
                    </button>
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn" onClick={(e) => answerText(e)}>
                    پاسخ
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn" onClick={(e) => deleteContact(event)}>
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
