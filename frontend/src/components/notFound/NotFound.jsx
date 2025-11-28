import React from 'react'
import './NotFound.css'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="box">
  <div className="box__ghost">
    
    <div className="box__ghost-container">
      <div className="box__ghost-eyes">
        <div className="box__eye-left"></div>
        <div className="box__eye-right"></div>
      </div>
      <div className="box__ghost-bottom">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div className="box__ghost-shadow"></div>
  </div>
  
  <div className="box__description">
    <div className="box__description-container">
      <div className="box__description-title">اوپس!</div>
      <div className="box__description-text">دسته بندی موردنظر شما یافت نشد!</div>
    </div>
    
    <Link to="/"className="box__button">برگرد</Link>
    
  </div>
  
</div>
  )
}
