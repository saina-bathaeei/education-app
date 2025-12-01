import React from "react";

import "./CourseDetailBox.css";

export default function CourseDedBox(props) {
  return (
    <div className="col-4">
      <div className="course-boxes__box">
        <div className="course-boxes__box-right">
          <i className={`course-boxes__box-right-icon fas fa-${props.icon}`}></i>
        </div>
        <div className="course-boxes__box-left">
          <span className="course-boxes__box-left-title">{props.title}</span>
          <span className="course-boxes__box-left--subtitle">{props.text}</span>
        </div>
      </div>
    </div>
  );
}
