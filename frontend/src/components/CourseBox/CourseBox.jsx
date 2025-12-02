import React from "react";
import { Rating, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import "./CourseBox.css";

export default function CourseBox(props) {


  console.log(props.shortName ,props.cover , "0bb71c7d624421a2442f6e32a30bb0b8d08a8110c3d1b14b6b969eeb4c03a2ac")


  return (
    <Link to={`/course-info/${props.shortName}`}>
      <div className="col-4">
        <div className="course-box">
          <a href="#">
            <img
              src={`https://res.cloudinary.com/dpzsifsol/image/upload/v1764662994/${props.cover}`}
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
              <img src="https://res.cloudinary.com/dpzsifsol/image/upload/v1764662988/Compare_Heights_1_iptmzj.png" alt="" />
              <p>{props.registers} نفر </p>  
            </div>

            <div className="course-box-footer-box">
              <img src="https://res.cloudinary.com/dpzsifsol/image/upload/v1764662991/Compare_Heights_3_eb0kip.png" alt="" />
              <p>{props.courseAverageScore} امتیاز از 5</p> 
            </div>

            <div className="course-box-footer-box">
            <img src="https://res.cloudinary.com/dpzsifsol/image/upload/v1764663001/Compare_Heights_4_zhpzaw.png" alt="" />
            <p>9</p>  
            </div>
          </div>
        </div>
      </div>
    </Link>
    
  );
}
