import React, { useEffect } from 'react'
import Style from './AllOrders.module.css'
import order from '../../Assets/Images/Messenger-pana.png'
import { Helmet } from 'react-helmet'

export default function AllOrders() {
 
    return <>
     <Helmet>
                <title>All Orders</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    <div className="row justify-content-center">
        <div className="col-md-9 d-flex flex-column align-items-center pt-5">
        <img src={order} className="w-50" style={{height:'550px'}} alt="" />
        <h3 className="text-uppercase">All Your Orders are Confirmed.</h3>
        </div>
    </div>
    </>
}

