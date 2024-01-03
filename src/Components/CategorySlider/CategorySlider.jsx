import React from 'react'
import Style from './CategorySlider.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from 'react-responsive'




export default function CategorySlider() {

function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}
const isSmallScreen = useMediaQuery({ maxWidth: 576 });
const isSmallMeduim = useMediaQuery({ minWidth: 576 });

    let {data} = useQuery('categorySlider' , getCategories )
    // console.log(data?.data.data);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow:isSmallScreen? 3 : 7, 
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:1000
      };
    return <> 
    {data?.data.data? 
    <div className="py-3">
        <Slider {...settings}>
        {data?.data.data.map((category)=> 
        <div key={category._id}>
        <img src={category.image} className="w-100" height={200} alt="" /></div>
        )}
    </Slider>
    </div>: '' }
   
    </>
}

