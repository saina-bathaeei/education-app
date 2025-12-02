import React from "react";
import FooterItem from "../FooterItem/FooterItem";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="about-us-footer">
        <img src="https://res.cloudinary.com/dpzsifsol/image/upload/v1764662977/Logo_ywk2gs.png" alt="" />
        <p>وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل قبول بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم!</p>
      </div>
      <div className="links-footer">


        <div className="quik-acsess">
          <div className="title-footer">
              <h1>دسترسی سریع</h1>
            </div>
            <div className="row-footer">
              <div className="col-6">
                <a href="#" className="footer-widgets__link">
                  آموزش HTML
                </a>
              </div>

              <div className="col-6">
                <a href="#" className="footer-widgets__link">
                  آموزش CSS
                </a>
              </div>
              <div className="col-6">
                <a href="#" className="footer-widgets__link">
                  آموزش جاوا اسکریپت
                </a>
              </div>
              <div className="col-6">
                <a href="#" className="footer-widgets__link">
                  آموزش ریکت
                </a>
              </div>

              <div className="col-6">
                <a href="#" className="footer-widgets__link">
                  آموزش پایتون
                </a>
              </div>
            </div>
          </div>

          <div className="social-footer">
        <div className="title-footer">
              <h1 style={{marginBottom: '10px'}}>برنامه های اجتماعی</h1>
            </div>
        <div className="col-6">
          <a href="#" className="footer-widgets__link">
            فیسبوک
          </a>
        </div>

        <div className="col-6">
          <a href="#" className="footer-widgets__link">
            اینیستاگرام
          </a>
        </div>

        <div className="col-6">
          <a href="#" className="footer-widgets__link">
            توییتر
          </a>
        </div>

        <div className="col-6">
          <a href="#" className="footer-widgets__link">
            یوتیوب
          </a>
        </div>

        <div className="col-6">
          <a href="#" className="footer-widgets__link">
            لینکدین
          </a>
        </div>
      </div>
          
        </div>


      


      <div className="img-footer">
        <img src="https://res.cloudinary.com/dpzsifsol/image/upload/v1764662941/249e6b727205861e4c367173d95007e6_izhwsd.jpg" alt="" />
      </div>

              
    </footer>
  );
}
