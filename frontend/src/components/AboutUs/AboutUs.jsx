import React, { useState } from "react";
import AboutUsBox from "../AboutUsBox/AboutUsBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import "./AboutUs.css";

export default function AboutUs() {

  const [aboutBox,setAboutBox] = useState([
    {title: 'ساختار و نقشه راه یادگیری مشخص', icon: `https://res.cloudinary.com/dpzsifsol/image/upload/v1764663017/gis--map-route_wmtdfk.svg` , info: 'یکی از بزرگ‌ترین چالش‌های یادگیری برنامه‌نویسی، سردرگمی در مورد "از کجا شروع کنم؟" است. یک آکادمی خوب یک برنامه درسی منسجم و منطقی ارائه می‌دهد که مباحث را از پایه تا پیشرفته و به ترتیب صحیح آموزش می‌دهد.· این ساختار باعث می‌شود زمان شما تلف نشود و مطمئن باشید که تمام مفاهیم ضروری را می‌آموزید.'},
    {title: 'یادگیری پروژه‌محور و عملی', icon: 'https://res.cloudinary.com/dpzsifsol/image/upload/v1764663017/flowbite--profile-card-outline_dvtsfc.svg' , info: 'بهترین آکادمی‌ها به جای تئوری محض، بر یادگیری مبتنی بر پروژه تأکید دارند. شما با ساختن پروژه‌های واقعی (مثل یک وب‌سایت، اپلیکیشن یا بازی) یاد می‌گیرید که چگونه دانش خود را در دنیای واقعی به کار ببندید.· این کار رزومه شما را نیز پربار می‌کند.'},
    {title: 'دسترسی به مربیان و منتورهای باتجربه', icon: 'https://res.cloudinary.com/dpzsifsol/image/upload/v1764663017/Teacher_i3ntai' , info: 'داشتن یک مربی که بتوانید سوالات خود را از او بپرسید، کدتان را برایش به اشتراک بگذارید و فیدبک فوری بگیرید، یک مزیت بزرگ است.· منتورها می‌توانند شما را از تله‌های رایج یادگیری نجات دهند و راهکارهای صنعتی (Industry Tips) را به شما آموزش دهند.'},
    {title: 'محیط یادگیری تعاملی و جامعه‌ی پشتیبان', icon: 'https://res.cloudinary.com/dpzsifsol/image/upload/v1764663017/fa7-solid--people-robbery_oap5m3' , info: 'در یک آکادمی، شما با گروهی از دانشجویان هم‌سطح و هم‌هدف خود ارتباط برقرار می‌کنید. این جامعه می‌تواند منبع بزرگی برای انگیزه، همکاری، حل مسئله و حتی شبکه‌سازی حرفه‌ای در آینده باشد.· بحث و تبادل نظر با دیگران درک شما را از مفاهیم عمیق‌تر می‌کند.'},
    {title: 'تمرکز بر تفکر الگوریتمی و حل مسئله', icon: 'https://res.cloudinary.com/dpzsifsol/image/upload/v1764663017/streamline-plump--deepfake-technology-1_lpp9qi' , info: 'یک آموزش باکیفیت، فراتر از سینتکس زبان برنامه‌نویسی، به شما می‌آموزد که چگونه مانند یک برنامه‌نویس فکر کنید. این مهارت اساسی، پایه‌ای برای حل هر نوع مشکل پیچیده‌ای در آینده خواهد بود.'},
    {title: 'دسترسی به منابع و ابزارهای خاص', icon: 'https://res.cloudinary.com/dpzsifsol/image/upload/v1764663017/fluent--code-24-regular_fur5yl' , info: 'ممکن است آکادمی به شما دسترسی به ابزارها، نرم‌افزارها، سرورها یا کتابخانه‌های پولی را بدهد که دسترسی شخصی به آن‌ها سخت یا پرهزینه است.'},
  ])

  return (
    <div className="about-us">
      <div className="container">
        <h1 className="title-every-section">چرا آکادمی ساحل؟</h1>

        <div className="container-about">
          <div className="row-about">
              {
                aboutBox.map(a => (
                  <AboutUsBox {...a}/>
                ))
              }
          </div>
        </div>
      </div>
    </div>
  );
}
