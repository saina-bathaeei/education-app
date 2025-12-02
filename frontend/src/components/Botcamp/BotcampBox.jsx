import React from 'react'
import './Botcamp.css'


export default function BotcampBox(props) {
  return (
    <div className='bot-camp-box'>
        <div className="bot-camp-box-img" style={{backgroundImage: `url(${props.img1})`}}>
        </div>
        <div className="bot-camp-box-info">
        <div className="bot-camp-box-title">
            <div className="icon-bot"><img src={props.img2} alt="" /></div>
            <h1>{props.name}</h1>
        </div>
        <p>توضیحات توضیحات توضیحات
        توضیحات توضیحات توضیحات 
        توضیحات توضیحات توضیحات 
        توضیحات توضیحات توضیحات 
        </p>
        <div className="degree-bot-camp">
            <span>بعد از اتمام دوره مدرک خود را تحویل میگیرید</span>
        </div>
        <div className="teacher-people-bot">
            <div className="teacher-bot"><img src="" alt="" /><span>محمد باقری</span></div>
            <div className="people-bot">118 شرکت کننده</div>
        </div>
        <button>شروعش رو خبر بده !</button>
        </div>
    </div>
  )
}
