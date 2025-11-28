import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function OrderInfo() {

    const [AllOrders,setAllOrders] = useState([])
    const param = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response1 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/orders/${param.id}`,{
                headers:{
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).token
                    }`,
                }
            })
              if (!response1.ok) throw new Error('First request failed');
            
              const json1 = await response1.json();
              setAllOrders(json1[0]);
            } catch (err) {
              console.log(err)
            } 
          };
          fetchData();
    },[])


    

  return (
    <div className='order-info-container'>
        <h1>مشخصات سفارش</h1>

        <div className='order-info-table-container'>
            <div className='user-info-table'>
                <h3>محصول</h3>
                <h3>مجموع</h3>
            </div>
            <div className='user-info-table'>
                <p style={{color:'gray'}}>{AllOrders.course.name}</p>
                <h3>{AllOrders.course.price} تومان</h3>
            </div>
            <div className='user-info-table'>
                <h3>جمع سبد خرید</h3>
                <h3>{AllOrders.course.price} تومان</h3>
            </div>
            <div className='user-info-table'>
                <h3>قیمت نهایی</h3>
                <h3>{AllOrders.course.discount === 0 ? (AllOrders.course.price) : ((AllOrders.course.price * AllOrders.course.price) / 100)}</h3>
            </div>
            <button className='order-info-button'>سفارش دوباره</button>
            
        </div>
        <div className='order-back-container'>
            <h1>آدرس صورت حساب</h1>
            <div className='bank-order-info'>
                <p>name</p>
                <p>phone</p>
                <p>email</p>
            </div>
        </div>

        
    </div>
  )
}
