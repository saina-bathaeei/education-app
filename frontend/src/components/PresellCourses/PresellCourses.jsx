import React,{ useEffect,useState } from "react";
import SectionHeader from "./../SectionHeader/SectionHeader";
import CourseBox from "../CourseBox/CourseBox";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';


import "./PresellCourses.css";

export default function PresellCourses() {

  const [persellCourses,setPersellCourses] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses/presell`)
    .then((res) => res.json())
    .then((data) => setPersellCourses(data))
},[])

  return (
    <div className="popular">
      <div className="container">
        <SectionHeader
          title='دوره های در حال پیش فروش'
          desc='متن تستی برای توضیحات دوره های پیش فروش'
        />
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('this is swiper')}
          onSwiper={(Swiper) => console.log(Swiper)}
        >
          {
            persellCourses.map((i) => (
              <SwiperSlide>
                <CourseBox {...i}/>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  );
}
