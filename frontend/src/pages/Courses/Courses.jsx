import React,{ useEffect,useState } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb"
import Pagination from '../../components/Pagination/Pagination'
import CourseBox from '../../components/CourseBox/CourseBox'
import CommentBox from '../../components/commentBox/CommentBox'
import NotFound from '../../components/notFound/NotFound'

export default function Courses() {

  const [courseData,setCourseData] = useState([])
  const [currentPage,setCurrentPage] = useState(0)
  const [coursePaga,setCoursePaga] = useState([])
  const [test , setTest] = useState([])


  useEffect(() => {

    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses`)
      .then(res => res.json())
      .then(data => setCourseData(data))

  },[])

  const clickHandler = (everyCoursePage) => {
    setCoursePaga(everyCoursePage)
  }

  const clickChange = (page) => {
    setCurrentPage(+page.target.innerHTML)
    console.log(page)
  }

  const findCourse = (e) => {
    console.log(e.target.value);
    
    setTest(coursePaga)

    let testFilter = test.map((i) => i.filter((k) => (
      k.name.includes(e.target.value)
    )))
      console.log(testFilter)
      
    setCoursePaga(testFilter)
  }

  console.log(coursePaga)

  return (
    <>
        <Header/>
        <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "آموزش برنامه نویسی فرانت‌اند",
            to: "category-info/frontend",
          },
          {
            id: 3,
            title: "دوره متخصص جاوا اسکریپت",
            to: "course-info/js-expert",
          },
        ]}
      />
        

        <div className="courses-content">
          
        <div className="courses-top-bar">
            <div className="courses-top-bar__right">
              <div className="courses-top-bar__row-btn courses-top-bar__icon--active">
                <img src="/images/icons/material-symbols--window-outline.svg" alt="" />
              </div>
              <div className="courses-top-bar__column-btn">
                <img src="/images/icons/dashicons--text.svg" alt="" />
              </div>

              <div className="courses-top-bar__selection">
                <span className="courses-top-bar__selection-title">
                  
                  مرتب سازی پیش فرض
                  <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                </span>
                <ul className="courses-top-bar__selection-list">
                  <li className="courses-top-bar__selection-item courses-top-bar__selection-item--active">
                    مرتب سازی پیش فرض
                  </li>
                  <li className="courses-top-bar__selection-item">
                    مرتب سازی بر اساس محبوبیت
                  </li>
                  <li className="courses-top-bar__selection-item">
                    مرتب سازی بر اساس امتیاز
                  </li>
                  <li className="courses-top-bar__selection-item">
                    مرتب سازی بر اساس آخرین
                  </li>
                  <li className="courses-top-bar__selection-item">
                    مرتب سازی بر اساس ارزان ترین
                  </li>
                  <li className="courses-top-bar__selection-item">
                    مرتب سازی بر اساس گران ترین
                  </li>
                </ul>
              </div>
            </div>

            <div className="courses-top-bar__left">
              <form action="#" className="courses-top-bar__form">
                <input
                  type="text"
                  className="courses-top-bar__input"
                  placeholder="جستجوی دوره ..."
                  onChange={(e) => findCourse(event)}
                />
                <img src="/images/icons/material-symbols--search (5).svg" alt="" />
              </form>
            </div>
          </div>


            <div className="container">
              <div className="row">
                {
                  coursePaga.length !== 0 ? (
                    coursePaga[currentPage].map((u) => (
                      <CourseBox {...u}/>
                    ))
                  ):(
                    <div className="not-found-container"><NotFound/></div>
                  )
                }
              </div>
            </div>
            {
            courseData.length !== 0 ? (
              <Pagination onChange={clickHandler} courses={courseData} onClick={clickChange} />
            ):(
              ''
            )
          }
          </div>
        <Footer/>
    </>
  )
}
