import React, { useState } from 'react'
import BotcampBox from './BotcampBox'
import './Botcamp.css'

export default function Botcamp() {

  const [bootCampInfo,setBootCampInfo] = useState([
    {name:'توسعه فرانت اند با ری اکت',info: '', img1: 'https://res.cloudinary.com/dpzsifsol/image/upload/v1764662982/bootcamp1_cj8fok.webp',img2:'https://res.cloudinary.com/dpzsifsol/image/upload/v1764663030/structure_p9j0np.png',people:'',teacher:''},
    {name:'آموزش HTML',info: '', img1: 'https://res.cloudinary.com/dpzsifsol/image/upload/v1764662999/bootcamp4_ycbni2.jpg',img2:'https://res.cloudinary.com/dpzsifsol/image/upload/v1764663017/html_hjisqr.png',people:'',teacher:''},
    {name:'پایتون برای تمام سنین',info: '', img1: 'https://res.cloudinary.com/dpzsifsol/image/upload/v1764663020/bootcamp2_i7hcvy.jpg',img2:'https://res.cloudinary.com/dpzsifsol/image/upload/v1764663022/python_dwkmki.png',people:'',teacher:''},
    {name:'توسعه هوش مصنوعی',info: '', img1: 'https://res.cloudinary.com/dpzsifsol/image/upload/v1764663031/bootcamp3_kubqiz.jpg',img2:'https://res.cloudinary.com/dpzsifsol/image/upload/v1764662986/ai_xjr7dl.png',people:'',teacher:''},
  ])

  return (
    <div className='bot-camp'>
        <div className="title-info-bot-camp">
            <h1>بوت کمپ های ما</h1>
            <p>بوت کمپ چیه؟ باید بگید به دوره های انلاین و حضوری میگیم که زمان برای ما اهمیت بسیاری داره و طی این آموزشات از شما پروزه های 
            خواسته میشه که شما باید اون ها رو انجام بدید. در این دوره ها شما با افراد جدید آشنا میشید و چیز های خیلی جدیدی رو یاد میگیرید.</p>
        </div>
        <div className="box-botcamp-container">
            {
              bootCampInfo.map((i) => (
                <BotcampBox {...i}/>
              ))
            }
        </div>
    </div>
  )
}
