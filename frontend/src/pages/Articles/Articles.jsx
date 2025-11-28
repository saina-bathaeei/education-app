import React, { useEffect, useState } from 'react'
import './Articles.css'
import Header from '../../components/header/Header'
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb"
import Footer from '../../components/Footer/Footer'
import ArticleBox from '../../components/ArticleBox/ArticleBox'

export default function Articles() {

    const [allArticles,setAllArticles] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/articles`)
        .then((res) => res.json())
        .then((data) => setAllArticles(data))
    },[])

    console.log(allArticles)
  return (
    <>
        <Header/>
        <Breadcrumb
            links={[
            { id: 1, title: "خانه", to: "" },
            {
                id: 2,
                title: "همه مقالات",
                to: "category-info/frontend",
            },
            
            ]}
        />

        <div className="courses-content">
            <div className="container">
              <div className="row">
                {
                    allArticles.map(i => (
                        <ArticleBox {...i}/>
                    ))
                }
              </div>
            </div>
        </div>

        <Footer/>

    </>
  )
}
