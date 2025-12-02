import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./Landing.css";
import Input from "../input/Input";
import Typewriter from "typewriter-effect";
import NavBar from "../header/NavBar";
import { useNavigate } from "react-router-dom";

export default function Landing() {

  const [indexInfo,setIndexInfo] = useState('')
  const navigate = useNavigate()

  

  useEffect(()=> {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/infos/index`)
      .then(res => res.json())
      .then(data => setIndexInfo(data))
  },[])


  const onSearch = () =>{
    navigate('/category-info/frontend')
  }
  return (
    <div className="header">
      <NavBar/>
        <section className="landing">
          <div className="landing-left">
              <h1>با ما برنامه نویسی یاد بگیرید</h1>
              <p>اکادمی تخصصی ساحل به شما برنامه نویسی رو از 
صفر صفر یاد میده کافیه که فقط برای یاد گرفتن وقت بزاری. 

</p>
              <span>حالا نوبت توعه تنها با تایپ کردن زبان برنامه نویسی مورد علاقه ات رو پیدا کن !</span>
              <div className="search-landing">
              <form style={{width:'50rem'}} action="#" className="courses-top-bar__form">
                <input
                  type="text"
                  className="courses-top-bar__input"
                  placeholder="چیو میخوای یاد بگیری ..."
                  //value={searchInput}
                  //onChange={(e) => searchForCourse(e)}
                />
                <img style={{marginRight: '304px',marginTop:'32px',position: 'absolute',border:'none',display:'none'}} src="/images/icons/material-symbols--search (5).svg" alt="" onClick={() => onSearch()}/>
              </form>
              </div>
  
              <div className="landing-left-bottom">
                <p className="p-landing-left">اگه نمیدونی از کجا شروع کنی فقط اینجا رو کلیک کن</p>
                <button>بزن بریم !</button>
            </div>

              
          </div>
          <div className="landing-right">
            <img src="https://res.cloudinary.com/dpzsifsol/image/upload/v1764663006/Group_20_xviuni.png" alt="" />
          </div>
    </section>
    </div>
    
  );
}