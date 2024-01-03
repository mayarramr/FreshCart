import React, { useContext } from 'react'
import Style from './Address.module.css'
import { useFormik } from 'formik'
import { cartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';


export default function Address() {
    let {onlinePayment , cartId} = useContext(cartContext)

    async function handleAddressSubmit (values){
        let response =  await onlinePayment(cartId , values)
        console.log(response.data.session.url);
        window.location.href=response.data.session.url;
  
    }

    let formik = useFormik({
        initialValues : {
            details :'',
            phone :'',
            city :'',

        },
        onSubmit:handleAddressSubmit
    })
    return <>
     <Helmet>
                <title>Address</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    <div className="container pt-5 mt-5">
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="details">Details : </label>
            <input type="text" id="details" name="details" className="form-control mb-2" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />

            <label htmlFor="phone">Phone : </label>
            <input type="tel" id="phone" name="phone" className="form-control mb-2"  value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />

            <label htmlFor="city">City : </label>
            <input type="text" id="city" name="city" className="form-control mb-2"  value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />

            <button type="submit" className="btn bg-main text-white mt-2">Checkout</button>
        </form>
    </div>
    </>
}

