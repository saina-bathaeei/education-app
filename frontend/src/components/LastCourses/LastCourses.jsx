import React, { useEffect, useState } from "react";
import CourseBox from "../CourseBox/CourseBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import "./LastCourses.css";

export default function LastCourses() {

  const [lastCourses,setLastCourses] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses`)
    .then(res => res.json())
    .then(data => {
      let lastC = data.slice(0,6)
      setLastCourses(lastC)
    })
  },[])


  return (
    <>
      <div className="courses">
        <div className="container">
          <h1 className="title-every-section">دوره ها</h1>

          <div className="courses-content">
            <div className="container">
              <div className="row">
                {
                  lastCourses.map((j) => (
                    <CourseBox {...j} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
