import React, { useState,useContext, useEffect } from 'react'
import authContext from '../../../authContext'
import './AccountDetails.css'
import { data } from 'react-router-dom'

export default function AccountDetails() {

    const [userDetail,setUserDetail] = useState([])
    let tokenToAc = JSON.parse(localStorage.getItem('user'))

    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/auth/me`,{
            headers:{
                Authorization : `Bearer ${tokenToAc.token}`
            },
        }).then(res => res.json())
        .then(data => {
            setUserDetail(data)
            setEmail(data.email)
            setName(data.phone)
            setPhone(data.phone)
            setUsername(data.username)
        })
        
    },[])

    const editUserInfo = () => {

        let userInfo = {
            username,
            name,
            email,
            phone,
            password
        }

        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/users`,{
            method:'PUT',
            headers:{
              'Content-Type' : 'application/json' ,
              Authorization : `Bearer ${tokenToAc.token}`
            },
            body: JSON.stringify(userInfo)
          }) .then(res => res.json())
          .then(data => console.log(data))
    }



  return (
    <div className="account-detail-container">
        <div class="col-9">
      <div class="ticket">
        <div class="ticket-header">
          <span class="ticket-header__title" style={{marginBottom:'30px'}}>اطلاعات کاربری</span>
          
        </div>
        <form class="account-form" action="#" onClick={(e) => e.preventDefault()}>
          <div class="row">

            <div class="col-6">
              <label class="ticket-form__label">شماره موبایل *</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='لطفا شماره خود را وارد کنید' class="ticket-form__input" type="text" />
            </div>
            <div class="col-6">
              <label class="ticket-form__label">نام و نام خانوادگی *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder='لطفا نام خود را وارد کنید' class="ticket-form__input" type="text" />
            </div>
            <div class="col-6">
              <label class="ticket-form__label">نام کاربری *</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='لطفا نام خود را وارد کنید' class="ticket-form__input" type="text" />
            </div>
            <div class="col-6">
              <label class="ticket-form__label">آدرس ایمیل *</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='لطفا ایمیل خود را وارد کنید' class="ticket-form__input" type="text" />
            </div>

            <div class="ticket-header password-change">
                <span class="ticket-header__title">تغییر رمز عبور</span>
            </div>

            <div class="col-6">
              <label class="ticket-form__label">رمز قبلی *</label>
              <input placeholder='لطفا رمز خود را وارد کنید' class="ticket-form__input" type="text" />
            </div>

            <div class="col-6">
              <label class="ticket-form__label">رمز جدید *</label>
              <input onChange={(e) => setPassword(e.target.value)} placeholder='لطفا رمز خود را وارد کنید' class="ticket-form__input" type="text" />
            </div>

            <div class="col-12">
              <button class="ticket-form__btn">
                <i class="ticket-form__btn-icon fa fa-paper-plane"></i>
                 تغییر اطلاعات
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}
