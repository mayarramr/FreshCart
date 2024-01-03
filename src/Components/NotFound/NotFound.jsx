import React from 'react'
import Style from './NotFound.module.css'
import error from '../../Assets/Images/404 error with portals-rafiki.png'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return <>
    <div className="row flex-column align-items-center">
    <div className="col-md-8">
    <img src={error} className="w-100" alt="error" style={{height:'700px'}}/>
    </div>
   <div className="col-md-4 d-flex justify-content-center">
   <Link to={'/home'} className="btn bg-main text-white">Back to Home Page</Link>
   
   </div>
    </div>
    </>
}


