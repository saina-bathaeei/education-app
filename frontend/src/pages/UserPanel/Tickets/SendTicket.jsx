import React, { useEffect, useState } from "react";

import "./SendTicket.css";

export default function SendTicket() {
  const [departments, setDepartments] = useState([]);
  const [departmentsSubs, setDepartmentsSubs] = useState([]);
  const [isDepCourse,setIsDepCourse] = useState(false)
  const [courses,setCourses] = useState([])
  const [deprtmentSelect,setDeprtmentSelect] = useState('')
  const [subDeprtmentSelect,setSubDeprtmentSelect] = useState('')
  const [contentSelect,setContentSelect] = useState('')
  const [titleSelect,setTitleSelect] = useState('')


  let localStorageData = JSON.parse(localStorage.getItem('user'))


  useEffect(() => {
   

      const fetchData = async () => {
        try {
          const response1 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/tickets/departments`);
          if (!response1.ok) throw new Error('First request failed');
          
          const json1 = await response1.json();
          const response2 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/users/courses`,{
            headers:{
                Authorization: `Bearer ${localStorageData.token}`
            }
          });
          
          if (!response2.ok) throw new Error('Second request failed');
          
          const json2 = await response2.json();
          setCourses(json2);
          setDepartments(json1);
        } catch (err) {
          console.log(err)
        } 
      };
      fetchData();
  }, []);

  const getDepartmentsSub = (departmentID) => {

    setDeprtmentSelect(departmentID)

    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/tickets/departments-subs/${departmentID}`)
      .then((res) => res.json())
      .then((subs) => setDepartmentsSubs(subs));
  };

  const departmentCourse = (e) => {
    console.log(e.target.value)
    if(e.target.value === '63b688c5516a30a651e98156'){
        setIsDepCourse(true)
    }else{
      setIsDepCourse(false)
    }
  }

  const sendTheTicket = () => {

    let ticketData = {
      departmentID: deprtmentSelect,
      departmentSubID: subDeprtmentSelect,
      title: titleSelect,
      body: contentSelect,
      priority: 1
    }

    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/tickets`,{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json' ,
        Authorization : `Bearer ${localStorageData.token}`
      },
      body: JSON.stringify(ticketData)
    }) .then(res => res.json())
    .then(data => console.log(data))
  }

  console.log(courses)

  return (
    <div class="col-9">
      <div class="ticket">
        <div class="ticket-header">
          <span class="ticket-header__title">ارسال تیکت جدید</span>
          <a class="ticket-header__link" href="#">
            همه تیکت ها
          </a>
        </div>
        <form class="ticket-form" action="#" onClick={(e) => e.preventDefault()}>
          <div class="row">
            <div class="col-6">
              <label class="ticket-form__label">دپارتمان را انتخاب کنید:</label>
              <select
                class="ticket-form__select"
                onChange={(event) => getDepartmentsSub(event.target.value)}
              >
                <option class="ticket-form__option">
                  لطفا یک مورد را انتخاب نمایید.
                </option>
                {departments.map((department) => (
                  <option value={department._id}>{department.title}</option>
                ))}
              </select>
            </div>
            <div class="col-6" onClick={(e) => departmentCourse(e)}>
              <label class="ticket-form__label">نوع تیکت را انتخاب کنید:</label>
              <select class="ticket-form__select" onChange={(e) => setSubDeprtmentSelect(e.target.value)}>
                <option class="ticket-form__option">
                  لطفا یک مورد را انتخاب نمایید.
                </option>
                {departmentsSubs.map((sub) => (
                  <option value={sub._id}>{sub.title}</option>
                ))}
              </select>
            </div>
                {
                  isDepCourse && (<div class="col-6">
                    <label class="ticket-form__label"> دروه مورد نظر را انتخاب کنید:</label>
                    <select class="ticket-form__select">
                      <option class="ticket-form__option">
                        لطفا یک مورد را انتخاب نمایید.
                      </option>
                      {
                        courses.map((i) => (
                          <option value={i._id}>{i.course === null ? '' : i.course.name}</option>
                        ))
                      }
                    </select>
                  </div>)
                }

            <div class="col-6">
              <label class="ticket-form__label">عنوان تیکت را وارد کنید:</label>
              <input class="ticket-form__input" type="text" onChange={(e) => setTitleSelect(e.target.value)} />
            </div>

            <div class="col-12" style={{gridColumn: '1 / -1'}}>
              <label class="ticket-form__label">
                محتوای تیکت را وارد نمایید:
              </label>
              <textarea class="ticket-form__textarea" onChange={(e) => setContentSelect(e.target.value)}></textarea>
            </div>
            <div class="col-12" style={{gridColumn: '1 / -1'}}>
              <div class="ticket-form__file">
                <span class="ticket-form__file-max">
                  حداکثر اندازه: 6 مگابایت
                </span>
                <span class="ticket-form__file-format">
                  فرمت‌های مجاز: jpg, png.jpeg, rar, zip
                </span>
                <input class="ticket-form__file-input" type="file" />
              </div>
            </div>
            <div class="col-12">
              <button class="ticket-form__btn" onClick={() => sendTheTicket()}>
                <i class="ticket-form__btn-icon fa fa-paper-plane"></i>
                ارسال تیکت
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
