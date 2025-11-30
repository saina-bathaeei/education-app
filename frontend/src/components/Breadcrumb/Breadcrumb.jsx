import React from "react";
import { Link } from "react-router-dom";

import "./Breadcrumb.css";

export default function Breadcrumb(props) {
  return (
    <section className="breadcrumb">
      <div className="container">
        <div className="breadcrumb__content">
          <div className="breadcrumb__home-content-icon">
            <img style={{width:'50px'}} src="/images/icons/material-symbols-light--home-rounded.svg"/>
          </div>
          <ul className="breadcrumb__list">
            {props.links.map((link) => (
              <li className="breadcrumb__item">
                <Link to={`/${link.to}`} className="breadcrumb__link">
                  {link.title}
                  {
                      link.id !== props.links.length ? (
                          <img style={{width:'30px'}} src="/images/icons/icon-park-outline--left.svg"/>
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
