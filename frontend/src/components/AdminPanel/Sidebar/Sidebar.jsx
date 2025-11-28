import React,{ useContext, useEffect } from "react";
import { Link,useNavigate } from 'react-router-dom'
import authContext from "../../../authContext";

import swal from "sweetalert";

import './Sidebar.css'

export default function Sidebar() {

  const navigate = useNavigate()
  const auth = useContext(authContext)

    const adminLogOut = () => {
      swal({
        title:'با موفقیت خارج شدید',
        icon:'success',
        buttons:'باشه'
      }).then(() => {
        auth.logout()
        navigate('/')
      })
    }

  

  return (
    <div id="sidebar" className="col-2">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <a href="#">
            <img src="/image/logo/Logo.png" alt="Logo" />
          </a>
        </div>

        <div className="sidebar-menu-btn">
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
        
          <li className="active-menu">
            <Link to="/p-admin">
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link to="courses">
              <span>دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to="sessions">
              <span>جلسات دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to="menus">
              <span>منو ها</span>
            </Link>
          </li>
          <li>
            <Link to="submenus">
              <span>ساب منو ها</span>
            </Link>
          </li>
          <li>
            <Link to="articles">
              <span>مقاله ها</span>
            </Link>
          </li>
          <li>
            <Link to="users">
              <span>کاربران</span>
            </Link>
          </li>
          <li>
            <Link to="contacts">
              <span>پیام ها</span>
            </Link>
          </li>
          <li>
            <Link to="comments">
              <span>کامنت ها</span>
            </Link>
          </li>
          <li>
            <Link to={'offs'}>
              <span>کدهای تخفیف</span>
            </Link>
          </li>
          <li>
            <Link to="categories">
              <span>دسته‌بندی‌ها</span>
            </Link>
          </li>
          <li >
            <a href="#" onClick={() => adminLogOut()}>
              <span>خروج</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
