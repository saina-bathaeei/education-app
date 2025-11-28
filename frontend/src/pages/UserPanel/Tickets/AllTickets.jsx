import React, { useEffect, useState } from "react";

import "./SendTicket.css";

export default function AllTickets() {
  const [allTickets, setAllTickets] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response1 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/tickets`,{

            headers:{
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
            }
          });
          if (!response1.ok) throw new Error('First request failed');
          
          const json1 = await response1.json();
          setAllTickets(json1);
        } catch (err) {
          console.log(err)
        } 
      };
      fetchData();
  }, []);

  console.log(allTickets)

  return (
    <div class="col-9" style={{width: '1100px'}}>
      <div class="ticket">
        <div class="ticket-header">
          <span class="ticket-header__title">همه تیکت ها</span>
          <a class="ticket-header__link" href="#">
            ارسال تیکت جدید
          </a>
        </div>
        <div className="all-tickets-container">
            <div className="ticket-val-box">
                <img src="/images/icons/tdesign--money.svg" alt="" />
                <h3>باز</h3>
                <span>0</span>
            </div>

            <div className="ticket-val-box">
                <img src="/images/icons/tdesign--money.svg" alt="" />
                <h3>بسته</h3>
                <span>0</span>
            </div>

            <div className="ticket-val-box">
                <img src="/images/icons/tdesign--money.svg" alt="" />
                <h3>پاسخ داده شده</h3>
                <span>0</span>
            </div>

            <div className="ticket-val-box">
                <img src="/images/icons/tdesign--money.svg" alt="" />
                <h3>پایان یافته</h3>
                <span>0</span>
            </div>

            <div className="ticket-val-box">
                <img src="/images/icons/tdesign--money.svg" alt="" />
                <h3>همه</h3>
                <span>0</span>
            </div>
        </div>
        <div className="user-ticket-container">
            <h1>تمام تیکت های شما</h1>
            {
                allTickets.map((i) => (
                    <div className="ticket-user-box">
                        <div className="user-ticket-title-dep">
                            <div className="user-ticket-title">
                                {i.title}
                            </div>
                            <div className="user-ticket-dep">
                                {i.departmentID}
                            </div>
                        </div>

                        <div className="ticket-user-info">
                            <h2>{i.user}</h2>
                            <div className="is-answered">{i.answer === 0 ? 'پاسخ داده نشده' : 'پاسخ داده شده'}</div>
                            <button>نمایش پاسخ</button>
                            <span>{i.createdAt.split('T')[0]}</span>
                        </div>
                    </div>
                ))
            }
        </div>
        
      </div>
    </div>
  );
}