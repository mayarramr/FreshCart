import React, { useEffect, useState } from 'react'
import Style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast'
import Slider from "react-slick";

export default function ProductDetails() {
    // let params = useParams()
    // const [productDetails, setproductDetails] = useState(null)
    // console.log(params.id);

    // async function  getProductDetails(id){
    //      let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    //      setproductDetails(data)
    // }

    // useEffect(()=>{
    //     getProductDetails(params.id)
    // },[])

    let params = useParams()
    function  getProductDetails(id){
      return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    let {data} = useQuery('productDetails' , () => getProductDetails(params.id))
    console.log(data?.data.data);


    const notify = () => toast(<>
        <i className="fa-solid fa-circle-check text-main mt-1 me-1"></i>
        Product Added Successfully!
        </>
        );

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true,
            autoplaySpeed:1000    
          };




    return <>
    <Helmet>
                <title>{data?.data.data.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
     {data?.data.data ? <div className="row align-items-center">
        <div className="col-md-3 pt-5">
        <div>
            <Slider {...settings}>
             {data.data.data.images.map((image)=>
                <div key={data.data.data.id}>
                    <img className="w-100" src={image} alt="" />
                </div>
             )}
            </Slider>
          </div>
        </div>

        <div className="col-md-9 pt-5 mt-5">
        <h2>{data?.data.data.title}</h2>
        <p>{data?.data.data.description}</p>
        <h6 className="text-main">{data?.data.data.category.name}</h6>
        <h6 className="text-main">{data?.data.data.price} EGP</h6>
        <div className="d-flex justify-content-between">
            <span>Rating Quantity : {data?.data.data.ratingsQuantity}</span>
            <span><i className="fas fa-star rating-color me-1 mb-2"></i>{data?.data.data.ratingsAverage}</span>
        </div>
        <button onClick={()=> notify()} className="btn bg-main text-white w-100 mt-4">Add to Cart</button>
        </div>

    </div> : ''}
    </>
}

