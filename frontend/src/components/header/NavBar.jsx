import React,{ useContext,useState,useMemo, useEffect } from 'react'
import './header.css'
import { FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import authContext from '../../authContext';

export default function NavBar() {

  const theUser = useContext(authContext)
  const [dropdownToggle,setDropdownToggle] = useState(false)
  const [hamburgerToggle,setHamburgerToggle] = useState(false)
  const [menus,setMenus] = useState([])
  const [activeIndex, setActiveIndex] = useState(null);
  

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/menus`)
      .then(res => res.json())
      .then(data => setMenus(data))
  },[])

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const refreshThePage = () => {
    window.location.reload();
  }
  
  
  const onHamburger = () => {
    setHamburgerToggle(prev => !prev)
  }

  return (
    <div className='nav-bar'>
        <div className="hamburger-icon">
          <img onClick={() => onHamburger()} src="/images/hamburger-button.svg" alt="" />
          <div className="hamburger-menu" style={hamburgerToggle ? {display:'flex'} : {display:'none'}}>
          <Link className='a-drop' to={'/'}>صفحه اصلی</Link>
            {
              

              hamburgerToggle && menus.map((menu,index) => (
                <div className="dropdown" onClick={(e) => refreshThePage(e)}>
                  <Link className='a-drop' to={`/category-info/${menu.href}`}>
                  <li className='link' onMouseOver={(e) => {
                    setDropdownToggle(true)
                    handleClick(index)
                    }}>{menu.title}</li></Link>
                  {dropdownToggle && (
                    <div className={`dropdown-menu ${dropdownToggle && activeIndex === index ? 'active' : ''}`} onMouseOver={e => {
                      setDropdownToggle(true)
                      
                      }} onMouseOut={() => setDropdownToggle(false)}>
                    
                      {
                        menus && menu.submenus.map(i => (
                          <div className='whenIsActive'>
                            <Link to={`/course-info/${i.href}`}>{i.title}</Link>
                          </div>
                        
                        ))
                      }
                  </div>)}
                </div>
              ))
              
            }
          </div>
        </div>
        <div className="nav-bar-right">
            <div className="logo"><img src="https://res.cloudinary.com/dpzsifsol/image/upload/v1764662977/Logo_ywk2gs.png" alt="" /></div>
            <ul>
              <Link className='a-drop' to={'/'}>صفحه اصلی</Link>
              {
                menus.map((menu,index) => (
                  <div className="dropdown" onClick={(e) => refreshThePage(e)}>
                    <Link className='a-drop' to={`/category-info/${menu.href}`}>
                    <li className='link' onMouseOver={(e) => {
                      setDropdownToggle(true)
                      handleClick(index)
                      }}>{menu.title}</li></Link>
                    {dropdownToggle && (
                      <div className={`dropdown-menu ${dropdownToggle && activeIndex === index ? 'active' : ''}`} onMouseOver={e => {
                        setDropdownToggle(true)
                        
                        }} onMouseOut={() => setDropdownToggle(false)}>
                      
                        {
                          menus && menu.submenus.map(i => (
                            <div className='whenIsActive'>
                              <Link to={`/course-info/${i.href}`}>{i.title}</Link>
                            </div>
                          
                          ))
                        }
                    </div>)}
                  </div>
                ))
              }
            
                     
            </ul>
        </div>
        <div className="nav-bar-left">
            <Link to={`/register`}><button className='name-nav'>{theUser.userInfos.name}</button></Link>
        </div>
    </div>
  )
}