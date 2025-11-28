import React,{ useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/input/Input";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./Contact.css";

export default function Contact() {
  const navigate = useNavigate();

  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phoneNumber,setphoneNumber] = useState('')
  const [body,setBody] = useState('')


  const addNewContact = (event) => {
    event.preventDefault();

    const newContactInfo = {
      name: username,
      email,
      phone:phoneNumber,
      body,
    };

    console.log(newContactInfo)

    fetch("${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContactInfo),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "پیغام شما با موفقیت به مدیران سایت ارسال شد",
          icon: "success",
          buttons: "اوکی",
        }).then((value) => {
          navigate("/");
          console.log(value)
        });
      }
    });


  };

  const stateRecogonizer = (e,s) => {
    console.log(e.target,s)

    if(e.target.id === 'username'){
      setUsername(s)
    }else if(e.target.id === 'email'){
      setEmail(s)
    }else if(e.target.id === 'pass'){
      setphoneNumber(s)
    }else if(e.target.id === 'body'){
      setBody(s)
    }
  }
  return (
    <>
      <Header/>

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ارتباط با ما</span>
          <span className="login__subtitle">
            نظر، پیشنهاد یا انتقادتو بنویس برامون :)
          </span>
          <form action="#" className="login-form">
            <div className="login-form__username login-form__parent">
              <Input
                onState={stateRecogonizer}
                element="input"
                id="username"
                className="login-form__username-input"
                type="text"
                placeholder="نام و نام خانوادگی"
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password login-form__parent">
              <Input
                onState={stateRecogonizer}
                element="input"
                id="email"
                className="login-form__password-input"
                type="text"
                placeholder="آدرس ایمیل"
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__phone-number login-form__parent">
              <Input
                onState={stateRecogonizer}
                element="input"
                id="pass"
                className="login-form__password-input"
                type="text"
                placeholder="شماره تماس"
              />
              <i className="login-form__password-icon fa fa-phone"></i>
            </div>
            <div className="login-form__text login-form__parent">
              <Input
                onState={stateRecogonizer}
                element="textarea"
                id="body"
                className="login-form__text-input"
                placeholder="متن خود را وارد کنید"
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <button className="login-form__btn" type="submit" onClick={(e) => addNewContact(event)}>
              <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
              <span className="login-form__btn-text">ورود</span>
            </button>
            {/*<Button
              className={`login-form__btn ${
                formState.isFormValid === true
                  ? "login-form__btn-success"
                  : "login-form__btn-error"
              }`}
              type="submit"
              onClick={addNewContact}
              disabled={!formState.isFormValid}
            >
              <span className="login-form__btn-text">ارسال</span>
            </Button>*/}
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
