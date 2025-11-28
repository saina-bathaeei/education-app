import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from '../../components/header/Header'
import Footer from "../../components/Footer/Footer";
import Input from "../../components/input/Input";
import NotFound from "../../components/notFound/NotFound";

import "./Category.css";
import CourseBox from "../../components/CourseBox/CourseBox";
import Pagination from "../../components/Pagination/Pagination";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Category() {

  const [courseCategory,setCourseCategory] = useState([])
  const [coursePaga,setCoursePaga] = useState([])
  const [loading, setLoading] = useState(true)
  const [newCategory,setNewCategory] = useState([])
  const [currentPage,setCurrentPage] = useState(0)
  const [searchInput,setSearchInput] = useState('')

  const location = useLocation();
  let nameC = useParams()


useEffect(() => {
  const fetchData = async () => {

    try {
      setLoading(true);
      const [response1, response2] = await Promise.all([
        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/category`),
        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses`)
      ]);
      if (!response1.ok || !response2.ok) {
        throw new Error('One or more fetches failed');
      }
      const result1 = await response1.json();
      const result2 = await response2.json();
      setCourseCategory(result2);
      console.log('fetch', result2)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

  useEffect(() => {
  
    let newCate = courseCategory.filter((i) =>  i.categoryID.name === nameC.categoryName)

    setNewCategory(newCate)

    console.log('course Category',courseCategory)


  },[courseCategory])
  
  

  if(newCategory.length !== 0){
    console.log('h')
  }else{
    console.log('l')
  }

  const clickHandler = (everyCoursePage) => {
    setCoursePaga(everyCoursePage)
  }

  const clickChange = (page) => {
    setCurrentPage(+page.target.innerHTML - 1)
    console.log(page)
  }


  


  ///////////////////////////////////////////////////////////////////////////////


  //////////////////////////filtering///////////////////////

  const filterCourses = (e) => {
    if(e.target.id === 'like'){

      let filteredLike = coursePaga.map(course => [...course].sort((a,b) => b.registers - a.registers))

      setCoursePaga(filteredLike)

      setNewCategory(prev => [...prev].sort((a,b) => b.registers - a.registers))
    }else if(e.target.id === 'score'){
      let filteredScore = coursePaga.map(course => [...course].sort((a,b) => b.courseAverageScore - a.courseAverageScore))
      setCoursePaga(filteredScore)
    }else if (e.target.id === 'latest'){
      let filteredDate = coursePaga.map(course => [...course].sort((a,b) => +b.createdAt.slice(0,7).replace('-','') - +a.createdAt.slice(0,7).replace('-','')))
      setCoursePaga(filteredDate)
    }else if (e.target.id === 'cheep'){
      let filteredcheep = coursePaga.map(course => [...course].sort((a,b) => b.price + a.price))
      setCoursePaga(filteredcheep)
    }else if(e.target.id === 'expensive'){
      let filteredex = coursePaga.map(course => [...course].sort((a,b) => b.price - a.price))
      setCoursePaga(filteredex)
    }
  }



  //////////////////////////////////////////////////////////////////////////////


  const searchForCourse = (e) => {
    setSearchInput(e.target.value)

    

   //console.log('search' , filteredSearchCourse)
  }

  const onSearch = () => {
    const filteredSearchCourse = coursePaga.map(course => course.filter((fi => fi.name.includes(searchInput))))

    setCoursePaga(filteredSearchCourse)
  }

  return (
    <>
    <div className="head-cont-mar" style={{marginTop:'20px'}}>
      <Header/>
    </div>

      <section className="courses">
        <div className="container">
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
                  <li id="like" className="courses-top-bar__selection-item" onClick={(event) => filterCourses(event)}>
                    مرتب سازی بر اساس محبوبیت
                  </li>
                  <li id="score" className="courses-top-bar__selection-item" onClick={(event) => filterCourses(event)}>
                    مرتب سازی بر اساس امتیاز
                  </li>
                  <li id="latest" className="courses-top-bar__selection-item" onClick={(event) => filterCourses(event)}>
                    مرتب سازی بر اساس آخرین
                  </li>
                  <li id="cheep" className="courses-top-bar__selection-item" onClick={(event) => filterCourses(event)}>
                    مرتب سازی بر اساس ارزان ترین
                  </li>
                  <li id="expensive" className="courses-top-bar__selection-item" onClick={(event) => filterCourses(event)}>
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
                  value={searchInput}
                  onChange={(e) => searchForCourse(e)}
                  
                />
                <img src="/images/icons/material-symbols--search (5).svg" alt="" onClick={() => onSearch()}/>
              </form>
            </div>
          </div>

          <div className="courses-content">
            <div className="container">
              <div className="row">
                {
                  coursePaga.length !== 0 && newCategory.length !== 0 ? (
                    coursePaga[currentPage].map((u) => (
                      <CourseBox {...u} key={u.title}/>
                    ))
                  ):(
                    <div className="not-found-container"><NotFound/></div>
                  )
                 
                }
              </div>
            </div>
          </div>
          {
            newCategory.length !== 0  ? (
              <Pagination onChange={clickHandler} courses={newCategory} onClick={clickChange} />
            ):(
              ''
            )
          }

        </div>
      </section>

      <Footer />
    </>
  );
}
