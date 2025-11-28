import React,{ useEffect,useState } from "react";
import SectionHeader from "./../SectionHeader/SectionHeader";
import CourseBox from "../CourseBox/CourseBox";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';

import "./PopularCourses.css";

export default function PopularCourses() {

  const [popularCourses,setPopularCourses] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses/popular`)
    .then((res) => res.json())
    .then((data) => setPopularCourses(data))
},[])

console.log(popularCourses)

  return (
    <div className="popular">
      <div className="container">
        <SectionHeader
          title="محبوب ترین دوره ها"
          desc="دوره های محبوب بر اساس امتیاز دانشجوها"
        />
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('this is swiper')}
          onSwiper={(Swiper) => console.log(Swiper)}
        >
          {
            popularCourses.map((i) => (
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
