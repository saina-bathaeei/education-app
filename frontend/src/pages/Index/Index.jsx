import React from 'react'
import Header from '../../components/header/Header'
import Landing from '../../components/Landing/Landing'
import LastCourses from '../../components/LastCourses/LastCourses'
import AboutUs from '../../components/AboutUs/AboutUs'
import Botcamp from '../../components/Botcamp/Botcamp'
import LastArticles from '../../components/LastArticles/LastArticles'
import Footer from '../../components/Footer/Footer'
import Loan from '../../components/Loan/Loan'
import './Index.css'

export default function Index() {

  

  return (
    <div>
      <Landing/>
      <Botcamp/>
      <LastCourses/>
      <Loan/>
      <AboutUs/>
      <LastArticles/>
      <Footer/>
    </div>
  )
}
