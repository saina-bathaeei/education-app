import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

export default function MainPage() {

    let localStorageData = JSON.parse(localStorage.getItem('user'))

    const [users,setUsers] = useState([])
    const [infoAdmin,setInfoAdmin] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response1 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/users`,{
                headers: {
                    Authorization: `Bearer ${localStorageData.token}`,
                },
            });
              if (!response1.ok) throw new Error('First request failed');
              
              const json1 = await response1.json();
              const response2 = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/infos/p-admin`,{
                headers: {
                    Authorization: `Bearer ${localStorageData.token}`,
                },
            });
              
              if (!response2.ok) throw new Error('Second request failed');
              
              const json2 = await response2.json();
              setUsers(json1);
              setInfoAdmin0(json2);
            } catch (err) {
              console.log(err)
            } 
          };
          fetchData();
    },[])

    let startPoint = users.length 
    users.splice(0, startPoint - 5)

    console.log(infoAdmin)


  return (
    <>
        <div className="admin-main-boxes">
            <div className="admin-box">
                <div className="admin-box-child">
                    <div className="admin-box-title">
                        <h2>درآمد</h2>
                    </div>
                    <div className="admin-box-info">
                        <p>$2,240</p>
                        <span>5.2%</span>
                        <img src="/images/icons/tdesign--money.svg" alt="" />
                    </div>
                    <div className="admin-box-p">
                        <p>درآمد در یک ماه گذشته</p>
                    </div>
                </div>
            </div>


            <div className="admin-box">
                <div className="admin-box-child">
                    <div className="admin-box-title">
                        <h2>فروش</h2>
                    </div>
                    <div className="admin-box-info">
                        <p>$2,240</p>
                        <span>5.2%</span>
                        <img src="/images/icons/ic--round-shopping-cart.svg" alt="" />
                    </div>
                    <div className="admin-box-p">
                        <p>فروش در یک ماه گذشته</p>
                    </div>
                </div>
            </div>


            <div className="admin-box">
                <div className="admin-box-child">
                    <div className="admin-box-title">
                        <h2>هزینه</h2>
                    </div>
                    <div className="admin-box-info">
                        <p>$2,240</p>
                        <span>5.2%</span>
                        <img src="/images/icons/grommet-icons--money.svg" alt="" />
                    </div>
                    <div className="admin-box-p">
                        <p>هزینه در یک ماه گذشته</p>
                    </div>
                </div>
            </div>
        </div>

        <DataTable title="تخفیف ها">
        
        <table class="table" style={{width:'100%',borderSpacing: '5px 20px'}}>
          <thead>
            <tr>
              <th style={{width:'5%'}}>شناسه</th>
              <th style={{width:'20%'}}>نام و نام خانوادگی</th>
              <th style={{width:'10%'}}>ایمیل</th>
              <th style={{width:'10%'}}>شماره تلفن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((course, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>{course.email}</td>
                <td>{course.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    
    </>
  )
}
