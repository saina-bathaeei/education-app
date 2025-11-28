import React,{ useState,useEffect, useCallback, useMemo } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import authContext from './authContext'

console.log(import.meta.env.VITE_REACT_APP_BACKEND_BASEURL)

import './App.css'

export default function App() {

  const router = useRoutes(routes)

  const [isLogin,setIsLogin] = useState(false)
  const [token,setToken] = useState(false)
  const [userInfos,setUserInfos] = useState(false)


  const login = (user,token) => {
    setToken(token)
    setIsLogin(true)
    setUserInfos(user)
    localStorage.setItem('user' , JSON.stringify({ token }))
  }

  const logout = () => {
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  }


  useMemo(() => {
    let getUser = JSON.parse(localStorage.getItem('user'))


    if(getUser){
      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/v1/auth/me`, {
        headers:{
          Authorization: `Brearer ${getUser.token}`,
        }
      }).then((res) => res.json())
        .then((data) => {
          setIsLogin(true)
          setUserInfos(data)
    
        })
    }else{
      setIsLogin(false)
    }
    
},[token])

  //hello()

  return (
    <authContext.Provider
      value={{
        isLogin,
        token,
        userInfos,
        login,
        logout
      }}
    >
      { router }
    </authContext.Provider>
  )
}

