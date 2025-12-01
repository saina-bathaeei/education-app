import React,{ useState,useEffect } from "react";
import Header from '../../components/header/Header'
import Footer from "../../components/Footer/Footer";

import "./CourseInfo.css";
import BreadCrumbUser from "../../components/Breadcrumb/Breadcrumb";
import CommentBox from "../../components/commentBox/CommentBox";
import CourseDedBox from "../../components/CourseDetailBox/CourseDetailBox";
import CommentsTextArea from "../../components/CommentsTextArea/CommentsTextArea";
import According from "../../components/according/According";
import { useParams,Link } from "react-router-dom";
import TextEditor from "../../components/Editor/Editor";
import Swal from "sweetalert2";


export default function CourseInfo() {

  const [isToggle,setIsToggle] = useState(null)
  const [courseInfos,setCourseInfos] = useState([])
  const [isget, setIsGet] = useState(false)
  const [allComments,setAllComments] = useState([])
  const [commentForThisCourse,setCommentForThisCourse] = useState([])
  const [relatedCourses,setRelatedCourses] = useState([])

  const nameC = useParams()
  
  let localStorageData = JSON.parse(localStorage.getItem('user'))

  console.log(nameC.courseName)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response1 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses/${nameC.courseName}`,{
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        });

        const response2 = fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/comments`);
        const response3 = fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses/related/react`);
        const [res1, res2, res3] = await Promise.all([response1, response2, response3]);
        if (!res1.ok || !res2.ok || !res3.ok) {
          throw new Error('Network response was not ok');
        }
        const data1 = await res1.json();
        const data2 = await res2.json();
        const data3 = await res3.json();
        setCourseInfos(data1);
        setIsGet(true)

        setAllComments(data2);
        setRelatedCourses(data3);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
    
    
  },[])

  console.log(relatedCourses)


  let found = allComments.filter((con) => con.course === courseInfos.name)
  
  
  console.log(found)
  console.log(courseInfos)

  
  
  const toggleAccardion = () => {
    setIsToggle(prevState => !prevState)
  }
  

  //console.log(courseInfos._id)

  const registerToCourse = () => {
    let courseInfo = {
      price: courseInfos.price
    }
    if (courseInfos.price !== 0){
      Swal.fire({
        title: "آیا از ثبت نام مطمعن هستید؟",
        icon: "warning"
      }).then((result) => {
        if(result.isConfirmed){
          fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/courses/${courseInfos._id}/register`,{
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json',
              Authorization: `Bearer ${localStorageData.token}`,
            },
            body: JSON.stringify(courseInfo), 
          }).then(res => console.log(res))
        }
      })

      
    }else {
      
    }
  }

  return (
    <>
      <Header/>

      <BreadCrumbUser
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

      <section className="course-info">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <a href="#" className="course-info__link">
                آموزش برنامه نویسی فرانت اند
              </a>
              <h1 className="course-info__title">
                {courseInfos.name}
              </h1>
              <p className="course-info__text">
                امروزه کتابخانه‌ها کد نویسی را خیلی آسان و لذت بخش تر کرده اند.
                به قدری که حتی امروزه هیچ شرکت برنامه نویسی پروژه های خود را با
                Vanilla Js پیاده سازی نمی کند و همیشه از کتابخانه ها و فریمورک
                های موجود استفاده می کند. پس شما هم اگه میخواید یک برنامه نویس
                عالی فرانت اند باشید، باید کتابخانه های کاربردی که در بازار کار
                استفاده می شوند را به خوبی بلد باشید
              </p>
              <div className="course-info__social-media">
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-telegram-plane course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-twitter course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-facebook-f course-info__icon"></i>
                </a>
              </div>
            </div>

            <div className="col-6">
              
               <video
                src=""
                poster={`/image/courses/${courseInfos.cover}`}
                className="course-info__video"
                controls
              ></video>
              
              
            </div>
          </div>
        </div>
      </section>

      <main className="main my-className-main">
        <div className="container">
          <div className="row my-row">
            <div className="col-8">
              <div className="course">
                <div className="course-boxes">
                  <div className="row ">
                    <CourseDedBox
                      icon="graduation-cap"
                      title="وضعیت دوره:"
                      text="به اتمام رسیده"
                    />
                    <CourseDedBox
                      icon="clock"
                      title=" مدت زمان دوره:"
                      text="19 ساعت"
                    />
                    <CourseDedBox
                      icon="calendar-alt"
                      title="آخرین بروزرسانی:"
                      text="1401/03/02"
                    />
                    <CourseDedBox
                      icon="graduation-cap"
                      title="وضعیت دوره:"
                      text="به اتمام رسیده"
                    />
                    <CourseDedBox
                      icon="clock"
                      title=" مدت زمان دوره:"
                      text="19 ساعت"
                    />
                    <CourseDedBox
                      icon="calendar-alt"
                      title="آخرین بروزرسانی:"
                      text="1401/03/02"
                    />
                  </div>
                </div>
                {/* Start Course Progress */}
                <div className="course-progress">
                  <div className="course-progress__header">
                    <i className="fas fa-chart-line course-progress__icon"></i>
                    <span className="course-progress__title">
                      درصد پیشرفت دوره: 100%
                    </span>
                  </div>
                  <div className="progress course-progress__bar">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-label="Animated striped example"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                {/* Finish Course Progress */}

                {/* Start Introduction */}

                <div className="introduction">
                  <div className="introduction__item">
                    <span className="introduction__title title">
                      آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار
                    </span>
                    <img
                      src="/image/info/1.gif"
                      alt="course info image"
                      className="introduction__img img-fluid"
                    />
                    <p className="introduction__text">
                      کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد
                      و سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود
                      که در بازار کار به شدت از آن ها استفاده می شود و اگر بدون
                      بلد بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت
                      خواهید شد و حتی ممکن است ناامید شوید!
                    </p>
                    <p className="introduction__text">
                      در این دوره نحوه کار با 20 مورد از پر استفاده ترین
                      کتابخانه های جاوا اسکریپت به صورت پروژه محور به شما عزیزان
                      آموزش داده می شود تا هیچ مشکلی برای ورود به بازار کار
                      نداشته باشید
                    </p>
                  </div>
                  <div className="introduction__item">
                    <span className="introduction__title title">
                      هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب
                      درآمد)
                    </span>
                    <img
                      src="/image/info/2.jpg"
                      alt="course info image"
                      className="introduction__img img-fluid"
                    />
                    <p className="introduction__text">
                      وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم،
                      از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در
                      حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون
                      موقع از این کتابخانه ها استفاده نکرده بودم.
                    </p>
                    <p className="introduction__text">
                      همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از
                      مهم ترین مباحثی هستند که هر برنامه نویس وب برای ورود به
                      بازار کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار
                      کرده باشد{" "}
                    </p>
                    <p className="introduction__text">
                      همان طور که از اسم این دوره مشخص است، هدف از این دوره
                      آموزش 20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه
                      های جاوا اسکریپت است تا شما بتوانید بعد از این دوره با
                      قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را ادامه
                      دهید، ری اکت یا نود یا … را راحت تر یاد بگیرید و در نهایت
                      وارد بازار کار شده و کسب درآمد کنید.
                    </p>
                    <p className="introduction__text">
                      شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی
                      کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه
                      جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد.
                      آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                    </p>
                    <p className="introduction__text">
                      در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه،
                      نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش
                      دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص
                      خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و
                      وب اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                    </p>
                  </div>
                  <div className="introduction__btns">
                    <a href="#" className="introduction__btns-item">
                      دانلود همگانی ویدیوها
                    </a>
                    <a href="#" className="introduction__btns-item">
                      دانلود همگانی پیوست‌ها
                    </a>
                  </div>

                  <div className="introduction__topic">

                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                            onClick={() => toggleAccardion()}
                          >
                            جلسات دوره ها
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          
                        {
                            isToggle && courseInfos.sessions.map((l,index) => (
                              (l.free === 1 || courseInfos.isUserRegisteredToThisCourse) ? (<div className="accordion-body introduction__accordion-body">
                                <div className="introduction__accordion-right">
                                    <span className="introduction__accordion-count">
                                        {index+1}
                                  </span>
                                  <i className="fab fa-youtube introduction__accordion-icon"></i>
                                  <Link to={'/'} className="introduction__accordion-link">
                                    {l.title}
                                  </Link>
                                </div>
                                <div className="introduction__accordion-left">
                                  <span className="introduction__accordion-time">
                                    {l.time}
                                  </span>
                                </div>
                              </div>) : (
                                <>
                                  <div className="introduction__accordion-right">
                                    <span className="introduction__accordion-count">
                                        {index+1}
                                  </span>
                                  <i className="fab fa-youtube introduction__accordion-icon"></i>
                                  <span className="introduction__accordion-link">
                                    {l.title}
                                  </span>
                                </div>
                                <div className="introduction__accordion-left">
                                  <span className="introduction__accordion-time">
                                    {l.time}
                                  </span>
                                </div>
                                </>
                              )
                            )) 
                        }
                        </div>
                      </div>
                    </div>
                  {/*
                    
                     isget && courseInfos.sessions.map((l) => (
                      <According
                        onToggle={toggleAccardion} {...l}
                      />
                    ))
                  */}
                  </div>
                </div>
                {/* Finish Introduction */}

                {/* Start Teacher Details */}

                <div className="techer-details">
                  <div className="techer-details__header">
                    <div className="techer-details__header-right">
                      <div
                        style={{backgroundImage: "url(/teacher.avif)"}}
                        className="techer-details__header-img"
                      ></div>
                      <div className="techer-details__header-titles">
                        <a href="#" className="techer-details__header-link">
                            علی سعیدی
                        </a>
                        <span className="techer-details__header-skill">
                          Front End & Back End Developer
                        </span>
                      </div>
                    </div>
                    <div className="techer-details__header-left">
                      <i className="fas fa-chalkboard-teacher techer-details__header-icon"></i>
                      <span className="techer-details__header-name">مدرس</span>
                    </div>
                  </div>
                  <p className="techer-details__footer">
                    اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2
                    سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در
                    زمینه وب فعالیت داشته باشم.و..
                  </p>
                </div>
                {/* Finish Teacher Details */}
                
                <CommentsTextArea abbleToComment={courseInfos.isUserRegisteredToThisCourse} />
                  
                  {
                    found.map(i => (
                      <CommentBox {...i}/>
                    ))
                  }
              </div>
            </div>

            <div className="col-4">
              <div className="courses-info">
                <div className="course-info">
                  <div className="course-info__register" onClick={() => registerToCourse()}>
                    <span className="course-info__register-title">
                      <i className="fas fa-graduation-cap course-info__register-icon"></i>
                        {courseInfos.isUserRegisteredToThisCourse ? 'شما دانشجوی دوره هستید' : 'ثبت نام در دوره'}  
                    </span>
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__total">
                    <div className="course-info__top">
                      <div className="course-info__total-sale">
                        <i className="fas fa-user-graduate course-info__total-sale-icon"></i>
                        <span className="course-info__total-sale-text">
                          تعداد دانشجو :
                        </span>
                        <span className="course-info__total-sale-number">178</span>
                      </div>
                    </div>
                    <div className="course-info__bottom">
                      <div className="course-info__total-comment">
                        <i className="far fa-comments course-info__total-comment-icon"></i>
                        <span className="course-info__total-comment-text">
                          67 دیدگاه
                        </span>
                      </div>
                      <div className="course-info__total-view">
                        <i className="far fa-eye course-info__total-view-icon"></i>
                        <span className="course-info__total-view-text">
                          14,234 بازدید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__header-short-url">
                    <i className="fas fa-link course-info__short-url-icon"></i>
                    <span className="course-info__short-url-text">لینک کوتاه</span>
                  </div>
                  <span className="course-info__short-url">
                    https://sabzlearn.ir/?p=117472
                  </span>
                </div>
                <div className="course-info">
                  <span className="course-info__topic-title">سرفصل های دوره</span>
                  <span className="course-info__topic-text">
                    برای مشاهده و یا دانلود دوره روی کلمه
                    <a href="#" style={{color: 'blue', fontWeight: 'bold'}}>
                      لینک
                    </a>
                    کلیک کنید
                  </span>
                </div>
                <div className="course-info">
                  <span className="course-info__courses-title">دوره های مرتبط</span>
                  <ul className="course-info__courses-list">

                  {
                    relatedCourses.map((i) => (
                      <li className="course-info__courses-list-item">
                      <a href="#" className="course-info__courses-link">
                        <img
                          src={`/image/courses/${i.cover}`}
                          alt="Course Cover"
                          className="course-info__courses-img"
                        />
                        <span className="course-info__courses-text">
                          {i.name}
                        </span>
                      </a>
                    </li>
                    ))
                  }
                    

                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
