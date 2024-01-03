import React, { useContext, useEffect } from 'react'
import Style from './Layout.module.css'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import { Outlet } from 'react-router-dom'
import { userContext } from '../../Context/UserContext'
import { Offline, Online } from "react-detect-offline";
import { Toaster } from 'react-hot-toast'
 

export default function Layout() {
    let {setUserToken} = useContext(userContext)
   useEffect(()=>{
     if (localStorage.getItem('userToken') !== null) {
    setUserToken(localStorage.getItem('userToken'))
}
   },[])
    return <>
    <Navbar/>
    <div className="container">
        <Outlet></Outlet>
        <Toaster/>
    </div>
    <div>
        <Offline>
            <div className="network"><i className="fas fa-wifi text-danger"></i>You're Offline</div>
        </Offline>
  </div>
    <Footer/>
    </>
}

