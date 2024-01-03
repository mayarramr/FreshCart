'useclient'
import React, { useContext } from 'react'
import Style from './Navbar.module.css'
import { Link, NavLink, useNavigate , useLocation } from 'react-router-dom';
import logo from '../../../Assets/Images/freshcart-logo.svg'
import { userContext } from '../../../Context/UserContext';
import { useMediaQuery } from 'react-responsive';
import instagram from '../../../Assets/Images/instagram.png'
import tiktok from '../../../Assets/Images/tik-tok.png'

export default function Navbar() {
  let location = useLocation()
  const isScreenSmall = useMediaQuery({maxWidth:576})

  let isActiveLink = (path) => {
    return location.pathname === path;
  }




  let {userToken , setUserToken} = useContext(userContext)
  let navigate =  useNavigate()

  function Logout() {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/')
    
  }

    return <>

    
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container">
    <Link className="navbar-brand" to="/">
        <img src={logo} alt="fresh-market-logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        {userToken !== null ? <>
        <li className="nav-item">
                  <NavLink className={isActiveLink("/home") ? 'nav-link bg-main rounded-3 me-3 text-white' :'nav-link me-3'} to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                 <NavLink className={isActiveLink("/categories") ? 'nav-link bg-main rounded-3 me-3 text-white' :'nav-link me-3'} to="/categories">Categories</NavLink>
                </li>
               <li className="nav-item">
                  <NavLink className={isActiveLink("/cart") ? 'nav-link bg-main rounded-3 me-3 text-white' :'nav-link me-3'} to="/cart">Cart</NavLink>
                </li>
        </> : ''}
        

      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

        {userToken !== null ?
        <>
       

 <div className="d-flex justify-content-between">
 <div className="d-flex align-items-center">
 <div className="dropdown">
     
     <button className="border-0 bg-transparent" data-bs-toggle="dropdown" aria-expanded="false">
     <lord-icon
    src="https://cdn.lordicon.com/mebvgwrs.json"
    trigger="hover"
    colors="primary:#121331,secondary:#f9c9c0,tertiary:#30e849,quaternary:#b26836,quinary:#ebe6ef"
    style={{width:"40px" , height:'40px'}}>
</lord-icon>
     </button>
              
     <ul className="dropdown-menu text-center">
       {/* <li><Link to={'/profile'}>Profile</Link></li> */}
       <Link to={'/allorders'}><li>My Orders</li></Link>
       <Link to={'/changepassword'}><li>Change Password</li></Link>
       <li className="nav-item">
          <span className="nav-link cursor-pointer" onClick={()=> Logout()}>Logout</span>
        </li>
     </ul>
   </div>


<div className="d-flex align-items-center">
<Link to={'/favorites'}>
 <button className="border-0 bg-transparent">
 <lord-icon
      className="my-auto"
    src="https://cdn.lordicon.com/igciyimj.json"
    trigger="morph"
    state="morph-glitter"
    style={{width:'30px' , height:'30px'}}>
</lord-icon>
 </button>
</Link>
</div>
 </div>
 <li className="nav-item d-flex align-items-center">
 <i className="fab fa-facebook mx-2 fa-xl"
  style={{ color: "#1877f2" }}>
</i>
<i className="fab fa-twitter mx-2 fa-xl" style={{ color: "#1da1f2" }}></i>
<i><img src={instagram} className="mx-1" style={{width:'27px' , height:'27px'}} alt="" /></i>
<i className="fab fa-youtube mx-2 fa-xl" style={{ color: "#c4302b" }}></i>
<i><img src={tiktok} style={{width:'27px' , height:'27px'}} alt="" /></i>
</li>
 </div>
        </> :''}
      
        
      </ul>
      
     
    </div>
  </div>
</nav>
    </>
}
