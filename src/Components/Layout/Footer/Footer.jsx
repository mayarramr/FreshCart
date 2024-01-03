import React from 'react'
import Style from './Footer.module.css'
import amazonpay from '../../../Assets/Images/amazon-pay.png'
import paypal from '../../../Assets/Images/paypal.png'
import card from '../../../Assets/Images/card.png'
import americanexpress from '../../../Assets/Images/american-express.png'
import googleplay from '../../../Assets/Images/googleplay.webp'
import appstore from '../../../Assets/Images/appstore.webp'

export default function Footer() {
    return <>
    <div className="bg-light py-4 mt-5 d-flex align-items-end">
    <div className="container">
        <div className="row">
            <h3>Get the FreshCart App Now !</h3>
            <h6>We will send you the link, open it on your phone to download the app.</h6>
        </div>

        <div className="row justify-content-between align-items-center pb-4 border-bottom">
                <div className="col-md-9">
                <input type="text" className="form-control my-2 " placeholder="Email" />
                </div>
                <div className="col-md-3 d-flex justify-content-center">
                <button className="btn bg-main text-white">Share App Link</button>
                </div>
        </div>

        <div className="row py-3 justify-content-between border-bottom">
            <div className="col-md-6 d-flex align-items-center">
                <h5>Payment Partners</h5>
                <i className="mx-3"><img src={amazonpay} alt="" style={{width:'70px' , height:'70px'}} /></i>
                <i className="mx-3"><img src={paypal} alt="" style={{width:'70px' , height:'70px'}} /></i>
                <i className="mx-3"><img src={americanexpress} alt="" style={{width:'70px' , height:'70px'}} /></i>
                <i><img src={card} alt="" style={{width:'40px' , height:'40px'}} /></i>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-end">
                <h5>Get deliveries with FreshCart</h5>
                <i className="mx-3"><img src={googleplay} alt="" style={{width:'90px' , height:'40px'}} /></i>
                <i><img src={appstore} alt="" style={{width:'90px' , height:'40px'}} /></i>
           
           </div>
        </div>
    </div>
    </div>
    </>
}

