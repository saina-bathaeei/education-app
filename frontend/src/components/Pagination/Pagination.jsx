import React,{ useState,useEffect } from "react";

import "./Pagination.css";

export default function Pagination({ onChange,courses,onClick }) {

  const [allCourse,setAllCourse] = useState([])
  const [newCourses,setNewCourses] = useState([])
  const [currentPage,setCurrentPage] = useState(0)

  const numberOfChildren = 6;

  let forVal = Math.floor(courses.length / numberOfChildren + 1)

  for (let i = 0; i < courses.length; i += numberOfChildren) {
    newCourses.push(courses.slice(i, i + numberOfChildren));
  }

  let deleteCount = newCourses.length   + 1 - forVal;
  newCourses.splice(forVal, deleteCount)



  const clickChange = (e) => {
    onClick(e)
    //setCurrentPage(+e.target.innerHTML)
  }

  const clickHandler = (newCourses, currentPage) => {

    onChange(newCourses,currentPage)
    
}

  

  return (
    <div onLoad={() => clickHandler(newCourses,currentPage)} className="courses-pagination">
      <ul className="courses__pagination-list">
        <li className="courses__pagination-item">
          <a href="#" className="courses__pagination-link">
            <img src="https://res.cloudinary.com/dpzsifsol/image/upload/v1764663030/lucide--move-right_mrexfd.svg" alt="" />
          </a>
        </li>
        {
          newCourses.map((i,index) => (
            <li className="courses__pagination-item" >
              <a href="#" className="courses__pagination-link" onClick={(event) => clickChange(event)}>
                {index + 1}
              </a>
            </li>
          ))
        }
        <li className="courses__pagination-item">
          <a href="#" className="courses__pagination-link">
            <img src="https://res.cloudinary.com/dpzsifsol/image/upload/v1764663027/lucide--move-left_1_ljzwtz.svg" alt="" />
          </a>
        </li>
      </ul>
    </div>
  );
}
