import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Swal from "sweetalert2";
import AddForm from "../../../components/AdminPanel/AddForm/AddForm";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [addInputs,setAddInputs] = useState(['نام','نام خانوادگی','ایمیل','رمز عبور','شماره تلفن'])

  useEffect(() => {
    getAllUsers()  
  }, []);

  const getAllUsers = () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/users`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allUsers) => {
        console.log(allUsers);
        setUsers(allUsers);
      });
  }

  

  const deleteUser = (e) => {
    //console.log(e.target.parentElement.parentElement.childNodes[2].innerHTML)

    let emailOfUser = e.target.parentElement.parentElement.childNodes[2].innerHTML

    let found = users.find((user) => user.email === emailOfUser)

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
      title: "آیا میخواهید این کاربر را حذف کنید؟",
      text: "این کاربر قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله پاکش کن!",
      cancelButtonText: "نه کنسلش کن!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "حذف شد",
          text: "کاربر شما حذف شده است.",
          icon: "success"
        });

        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/users/${found._id}`,{
          method:'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => console.log(res))

        getAllUsers()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "کنسل شد",
          text: "کاربر شما امن است :)",
          icon: "error"
        });
      }
    });
  }

  const banUser = (e) => {
    let emailOfUser = e.target.parentElement.parentElement.childNodes[2].innerHTML

    let found = users.find((user) => user.email === emailOfUser)

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
      title: "آیا میخواهید این کاربر را مسدود کنید؟",
      text: "این کاربر قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله مسدودش کن!",
      cancelButtonText: "نه کنسلش کن!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "مسدود شد",
          text: "کاربر شما مسدود شده است.",
          icon: "success"
        });

        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/users/ban/${found._id}`,{
          method:'PUT',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => console.log(res))

        getAllUsers()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "کنسل شد",
          text: "کاربر شما امن است :)",
          icon: "error"
        });
      }
    });
  }

  return (
    <>
      <AddForm items={addInputs}/>
      <DataTable title="کاربران">
        
        <table class="table" style={{width:'100%',borderSpacing: '5px 20px'}}>
          <thead>
            <tr>
              <th style={{width:'10%'}}>شناسه</th>
              <th style={{width:'30%'}}>نام و نام خانوادگی</th>
              <th style={{width:'30%'}}>ایمیل</th>
              <th style={{width:'10%'}}>ویرایش</th>
              <th style={{width:'10%'}}>حذف</th>
              <th style={{width:'10%'}}>مسدود کردن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                {/* <td>09123443243</td> */}
                <td>{user.email}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn" onClick={(e) => deleteUser(event)}>
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn" onClick={(e) => banUser(event)}>
                    مسدود کردن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
