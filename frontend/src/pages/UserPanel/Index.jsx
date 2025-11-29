import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from "./../../components/Footer/Footer"
import Header from '../../components/header/Header'
//import Sidebar from '../../Components/UserPanel/Sidebar/Sidebar'

import './Index.css'

export default function IndexUser() {
  return (
      <>
        <Header/>

        <section class="content">
        <div class="content-header">
            <div class="container">
                <span class="content-header__title">حساب کاربری من</span>
                <span class="content-header__subtitle">پیشخوان</span>
            </div>
        </div>
        <div class="content-main">
            <div class="container">
                <div class="row" style={{display:'flex',gap:'20px'}}>
                    {/*<Sidebar />*/}

                    <Outlet />

                </div>
            </div>
        </div>
    </section>

        <Footer />
      </>
  )
}
