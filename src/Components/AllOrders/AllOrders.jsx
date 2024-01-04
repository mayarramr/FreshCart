import React, { useEffect } from 'react'
import Style from './AllOrders.module.css'
import order from '../../Assets/Images/Messenger-pana.png'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function AllOrders() {
 
    return <>
     <Helmet>
                <title>All Orders</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    <div className="row justify-content-center">
        <div className="col-md-5 d-flex flex-column align-items-center pt-5">
        <img src={order} className="w-100" alt="" />
        <h3 className="text-uppercase text-center">All Your Orders are Confirmed.</h3>
        <Link to={'/home'} className="btn bg-main text-white mt-2">Back to Home Page.</Link>
        </div>
    </div>
    </>
}

