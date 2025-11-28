import React from "react";
import { Rating, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import "./CourseBox.css";

export default function CourseBox(props) {


  return (
    <Link to={`/course-info/${props.shortName}`}>
      <div className="col-4">
        <div className="course-box">
          <a href="#">
            <img
              src={`/image/courses/${props.cover}`}
              alt="Course img"
              className="course-box__img"
            />
          </a>
          <div className="course-box__main">
            <a href="#" className="course-box__title">
              {props.name}
            </a>

            <div className="course-box__rating-teacher">
              <div className="course-box__teacher">
                <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                <a href="#" className="course-box__teacher-link">
                  علی سعیدی
                </a>
              </div>
              <div className="course-box__price">
              {props.price}
              </div>
            </div>

            <div className="course-box__status">
              <div className="course-box__users">
                <i className="fas fa-users course-box__users-icon"></i>
              </div>
            </div>
          </div>

          <div className="course-box__footer">
            <div className="course-box-footer-box">
              <img src="/image/svgs/Compare Heights (1).png" alt="" />
              <p>{props.registers} نفر </p>  
            </div>

            <div className="course-box-footer-box">
              <img src="/image/svgs/Compare Heights (3).png" alt="" />
              <p>{props.courseAverageScore} امتیاز از 5</p> 
            </div>

            <div className="course-box-footer-box">
            <img src="/image/svgs/Compare Heights (4).png" alt="" />
            <p>9</p>  
            </div>
          </div>
        </div>
      </div>
    </Link>
    
  );
}
