import React,{ useState,useEffect,memo } from 'react'
import './header.css'
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom"
export default memo (function TopHeader() {

    const [allTopBar,setAllTopBar] = useState('')
    const [indexInfo,setIndexInfo] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
              const response1 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/menus/topba`);
              if (!response1.ok) throw new Error('First request failed');
            
              const json1 = await response1.json();
              const response2 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/infos/index`);
            
              if (!response2.ok) throw new Error('Second request failed');
            
              const json2 = await response2.json();
              setAllTopBar(json1);
              setIndexInfo(json2);
            } catch (err) {
              console.log(err)
            } 
        };
        fetchData();
        
    },[])

    const randomLink = (arr,count) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random())
        return shuffled.slice(0,count)
    }

  return (
    <div className='top-header'>
        <div className="top-header-right">
        
            <ul>
                {
                    randomLink(allTopBar,5).map((l) => (
                        <Link to={l.href}>
                            <li><a href="">{l.title}</a></li>
                        </Link>
                    ))
                }
            </ul>
        </div>
        <div className="top-header-left">
            <div className="sab-phone">
                <FaPhone />
                <p>{indexInfo.phone}</p>
            </div>
            <div className="sab-email">
                <MdEmail />
                <p>{indexInfo.email}</p>
            </div>
        </div>

    </div>
  )
})
