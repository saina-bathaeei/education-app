import React from "react";

import "./SectionHeader.css";

export default function SectionHeader({ title, desc, btnTitle }) {
  return (
    <div className="courses-header">
      <div className="courses-header__right">
        <span className="courses-header__title title">{title}</span>
        <span className="courses-header__text">{desc}</span>
      </div>
      {
          btnTitle ? (
            <div className="courses-header__left">
            <a href="#" className="courses-header__link">
              تمامی دوره ها
              <img src="/images/icons/lucide--move-left.svg" alt="" />
            </a>
          </div>
          ) : null
      }
    </div>
  );
}
