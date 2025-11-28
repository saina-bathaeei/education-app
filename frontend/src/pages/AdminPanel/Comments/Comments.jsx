import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2'


export default function Comments() {

    const [comments,setComments] = useState([])
    const [showAnswers,setShowAnswers] = useState('isAnswered')

    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/comments`)
            .then(res => res.json())
            .then(data => setComments(data))
    },[])

    const showText = (e) => {
        let emailOfUser = e.target.parentElement.parentElement.childNodes[1].innerHTML
    
        let found = comments.find((con) => con._id === emailOfUser)
    
        console.log(found)
    
        Swal.fire(found.body);
      }

      const addAnswers = (e) => {

        let emailOfUser = e.target.parentElement.parentElement.childNodes[1].innerHTML
        let localStorageData = JSON.parse(localStorage.getItem('user'))


        Swal.fire({
            title: 'لطفا پاسخ خور را بنویسید:',
            input: 'text', // Specifies a text input field
            inputPlaceholder: 'بنویسید...',
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              const inputValue = result.value;

              let answerInfo = {
                body: inputValue
              }

              console.log(inputValue)

                fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/comments/answer/${emailOfUser}`,{
                method: 'POST',
                headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${localStorageData.token}`,
                },
                body: JSON.stringify(answerInfo), 
            })
            .then(res => Swal.fire('پاسخ شما ارسال شد!'))
            .catch(err => Swal.fire(err))
            }
          });
      }

      const deleteComment = (e) => {


        let emailOfUser = e.target.parentElement.parentElement.childNodes[1].innerHTML

        let found = comments.find((con) => con._id === emailOfUser)

        let localStorageData = JSON.parse(localStorage.getItem('user'))
        console.log(found)


        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "آیا میخواهید این  کامنت را حذف کنید؟",
          text: "این کامنت قابل بازگشت نیست!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "بله پاکش کن!",
          cancelButtonText: "نه کنسلش کن!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: "حذف شد",
              text: " کامنت شما حذف شده است.",
              icon: "success"
            });

            fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/comments/${found._id}`,{
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
              text: " کامنت شما امن است :)",
              icon: "error"
            });
          }
        });
      }

      let answeredComments = comments.filter(con => con.answer !== 0)
      let notAnsweredComments = comments.filter(con => con.answer === 0)

      

  return (
    <>
        <DataTable title="دسته بندی ها">

            <div className="showAnswer">
                <button className={`${showAnswers === 'isAnswered' ? 'answerActive' : ''}`} onClick={() => setShowAnswers('isAnswered')}>کامنت های جواب داده شده</button>
                <button className={`${showAnswers !== 'isAnswered' ? 'answerActive' : ''}`} onClick={() => setShowAnswers('notAnswered')}>کامنت های جواب نداده شده</button>
            </div>

            
            
            {
                showAnswers === 'isAnswered' ? (
                    <table className="table" style={{width:'100%',borderSpacing: '5px 20px'}}>
                        <thead>
                            <tr>
                            <th style={{width:'10%'}}>شناسه</th>
                            <th style={{width:'10%'}}>id</th>
                            <th style={{width:'20%'}}>نام کاربری</th>
                            <th style={{width:'10%'}}>پاسخ</th>
                            <th style={{width:'10%'}}>متن</th>
                            <th style={{width:'5%'}}>حذف</th>
                            <th style={{width:'10%'}}>مسدود کردن</th>
                            </tr>
                        </thead>
                        <tbody>
            {
              answeredComments.map((i,index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{i._id}</td>
                  <td>{i.creator.username}</td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn" onClick={() => Swal.fire(i.answerContent.body)}>
                        نمایش پاسخ
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn" onClick={(e) => showText(e)}>
                      نمایش متن
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger delete-btn" onClick={(e) => deleteComment(e)}>
                      حذف
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger delete-btn">
                      مسدود کردن کاربر
                    </button>
                  </td>
                </tr>
              ))
            }
              
            
          </tbody>
        </table>
                ) : (
        <table className="table" style={{width:'100%',borderSpacing: '5px 20px'}}>
          <thead>
            <tr>
              <th style={{width:'10%'}}>شناسه</th>
              <th style={{width:'10%'}}>id</th>
              <th style={{width:'20%'}}>نام کاربری</th>
              <th style={{width:'10%'}}>پاسخ دادن</th>
              <th style={{width:'10%'}}>متن</th>
              <th style={{width:'5%'}}>حذف</th>
              <th style={{width:'10%'}}>مسدود کردن</th>
            </tr>
          </thead>
          <tbody>
            {
              notAnsweredComments.map((i,index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{i._id}</td>
                  <td>{i.creator.username}</td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn" onClick={(e) => addAnswers(e)}>
                      پاسخ دادن
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn" onClick={(e) => showText(e)}>
                      نمایش متن
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger delete-btn" onClick={(e) => deleteComment(e)}>
                      حذف
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger delete-btn">
                      مسدود کردن کاربر
                    </button>
                  </td>
                </tr>
              ))
            }
              
            
          </tbody>
        </table>
                )
            }
      </DataTable>
    
    </>
  )
}
