import React, { useState } from 'react'
import BotcampBox from './BotcampBox'
import './Botcamp.css'

export default function Botcamp() {

  const [bootCampInfo,setBootCampInfo] = useState([
    {name:'توسعه فرانت اند با ری اکت',info: '', img1: '/image/bootcamp1.webp',img2:'/image/svgs/structure.png',people:'',teacher:''},
    {name:'آموزش HTML',info: '', img1: '/image/bootcamp4.jpg',img2:'/image/svgs/html.png',people:'',teacher:''},
    {name:'پایتون برای تمام سنین',info: '', img1: '/image/bootcamp2.jpg',img2:'/image/svgs/python.png',people:'',teacher:''},
    {name:'توسعه هوش مصنوعی',info: '', img1: '/image/bootcamp3.jpg',img2:'/image/svgs/ai.png',people:'',teacher:''},
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
