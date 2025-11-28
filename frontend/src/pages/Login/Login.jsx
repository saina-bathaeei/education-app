import React,{ useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Footer from "../../components/Footer/Footer";
import Header from '../../components/header/Header'
import Input from "../../components/input/Input";
import authContext from "../../authContext";
import swal from "sweetalert";
import Swal from 'sweetalert2'


import "./Login.css";

export default function Login() {

  let theToken = useContext(authContext)
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const loginUser = async () => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/auth/login`

    const userLogin = {
      identifier: username,
      password: password
    }
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(userLogin), 
      })
      .then(res => res.json())
      
      .then(data => {
        let token = data.accessToken

        localStorage.setItem('user' , JSON.stringify({ token }))

        theToken.login(data.user,token)

        Swal.fire({
          title: "ورود شما موفقیت آمیز بود.",
          text: "امیدواریم از سایتمون لذت ببرید",
          icon: "success"
        });
        navigate('/')

      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          icon: "error",
          title: "اوپس",
          text: "ورود شمل موفقیت آمیز نبود",
        });
      })
  }


  const stateRecogonizer = (e,s) => {
    console.log(e.target.value)

    if(e.target.id === 'username'){
      setUsername(s)
    }else if(e.target.id === 'email'){
      setEmail(s)
    }else if(e.target.id === 'pass'){
      setPassword(s)
    }
  }



  return (
    <>
      <Header/>

      <section className="login-register">
        <div className="login">
          <span className="login__title">ورود به حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم دوباره میبینیمت دوست عزیز :)
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">کاربر جدید هستید؟</span>
            <Link className="login__new-member-link" to="/register">
              ثبت نام
            </Link>
          </div>
          <form action="#" className="login-form" onSubmit={(event) => event.preventDefault()}>
            <div className="login-form__username">
              <Input
                className="login-form__username-input"
                type="text"
                placeholder="نام کاربری یا آدرس ایمیل"
                element='input'
                id='username'
                onState={stateRecogonizer}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <Input
                className="login-form__password-input"
                type="text"
                placeholder="رمز عبور"
                element='input'
                id='pass'
                onState={stateRecogonizer}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <button className="login-form__btn" type="submit" onClick={() => loginUser()}>
              <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
              <span className="login-form__btn-text">ورود</span>
            </button>
            <div className="login-form__password-setting">
              <label className="login-form__password-remember">
                <Input
                className="login-form__password-checkbox"
                type="checkbox" 
                placeholder=''
                element='input'
                />
                <span className="login-form__password-text">
                  مرا به خاطر داشته باش
                </span>
              </label>
              <label className="login-form__password-forget">
                <a className="login-form__password-forget-link" href="#">
                  رمز عبور را فراموش کرده اید؟
                </a>
              </label>
            </div>
          </form>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
