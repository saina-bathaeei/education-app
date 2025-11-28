import React,{ createContext } from 'react'

const authContext = createContext({
    isLogin: false,
    token: null,
    userInfos:null,
    login : () => {},
    logout: () => {}
})

export default authContext

