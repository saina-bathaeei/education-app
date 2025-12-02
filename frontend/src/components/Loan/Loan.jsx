import './Loan.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Loan() {

  let navigate = useNavigate()


  return (
    <div className='loan-container'>
        <div className="loan">
            <div className="loan-title">از اکادمی<img src='https://res.cloudinary.com/dpzsifsol/image/upload/v1764662977/Logo_ywk2gs.png'/>قسطی خرید کن</div>
            <p>برای سهولت در ثبت‌نام و همراهی بیشتر با شما، امکان پرداخت اقساطی فراهم شده است.همچنین، سرویس‌های معتبر 
            دیجی‌پی و ازکی‌وام نیز در دسترس شما هستند تا فرآیند پرداخت اقساطی با خیالی آسوده انجام شود.</p>
            <div className="support-loan">
                <h1>فقط کافیه به پشتیبانی زنگ بزنی!</h1>
                <button onClick={() => navigate('/')}>پشتیبانی</button>
            </div>
        </div>
    </div>
  )
}
