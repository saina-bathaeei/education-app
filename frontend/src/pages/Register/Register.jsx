import React,{ useState,useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from '../../components/header/Header'
import Input from "../../components/input/Input";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

import authContext from "../../authContext";

import "./Register.css";

export default function Register() {

  let theToken = useContext(authContext)
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [phone,setPhone] = useState('')
  const [name,setName] = useState('')

  const navigate = useNavigate()



  const [alertTrueToggle,setAlertTrueToggle] = useState(false)
  const [alertFalseToggle,setAlertFalseToggle] = useState('false')

  //console.log(phone)

  const registerUser = async () => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/auth/register`

    const userRegister = {
      username:`${username}`,
      email:`${email}`,
      password:`${password}`,
      confirmPassword:`${password}`,
      name:`${username}`,
      phone
    }
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(userRegister), 
      }).then( res => res.json())
      .then(data => {
        console.log(data)

        let token = data.accessToken

        localStorage.setItem('user' , JSON.stringify({ token }))

        theToken.login(data.user,token)

        Swal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success"
        });
        navigate('/')
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
        navigate('/')
      })
  }

  const stateRecogonizer = (e,s) => {
    console.log(e.target,s)

    if(e.target.id === 'username'){
      setUsername(s)
    }else if(e.target.id === 'email'){
      setEmail(s)
    }else if(e.target.id === 'pass'){
      setPassword(s)
    }else if (e.target.id === 'phone'){
      setPhone(s)
    }else if (e.target.id === 'name'){
      setName(s)
    }
  }

  return (
    <>
      <Header/>

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">خوشحالیم قراره به جمع ما بپیوندی</span>
          <div className="login__new-member">
            <span className="login__new-member-text">قبلا ثبت‌نام کرده‌اید؟ </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" className="login-form" onSubmit={(event) => event.preventDefault() }>
          <div className="login-form__username">
              <Input
                className="login-form__username-input"
                type="text"
                placeholder="نام و نام خانوادگی"
                element='input'
                id='name'
                onState={stateRecogonizer}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>

            <div className="login-form__username">
              <Input
                className="login-form__username-input"
                type="text"
                placeholder="نام کاربری"
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
                placeholder="آدرس ایمیل"
                element='input'
                id='email'
                onState={stateRecogonizer}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__username">
              <Input
                className="login-form__username-input"
                type="text"
                placeholder="شماره تماس"
                element='input'
                id='phone'
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
            <button className="login-form__btn" type="submit" onClick={() => registerUser()}>
              <i className="login-form__btn-icon fa fa-user-plus"></i>
              <span className="login-form__btn-text">عضویت</span>
            </button>
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
