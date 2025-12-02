import React from "react";
import { Link } from "react-router-dom";

import "./Breadcrumb.css";

export default function BreadCrumbUser(props) {
  return (
    <section className="breadcrumb">
      <div className="container">
        <div className="breadcrumb__content">
          <div className="breadcrumb__home-content-icon">
            <img style={{width:'50px'}} src="https://res.cloudinary.com/dpzsifsol/image/upload/v1764663032/material-symbols-light--home-rounded_jufesg.svg"/>
          </div>
          <ul className="breadcrumb__list">
            {props.links.map((link) => (
              <li className="breadcrumb__item">
                <Link to={`/${link.to}`} className="breadcrumb__link">
                  {link.title}
                  {
                      link.id !== props.links.length ? (
                          <img style={{width:'30px'}} src="https://res.cloudinary.com/dpzsifsol/image/upload/v1764663027/icon-park-outline--left_irgc5x.svg"/>
                      ) : null
                  }
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
