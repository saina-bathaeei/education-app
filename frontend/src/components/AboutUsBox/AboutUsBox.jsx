import React from "react";

import "./AboutUsBox.css";

export default function AboutUsBox(props) {
  return (
    <div className="about-us-box">
      <img src={props.icon} alt="" />
      <h1>{props.title}</h1>
      <p>{props.info}</p>
    </div>
  );
}
