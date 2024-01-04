import React from 'react'
import Style from './MainSlider.module.css'
import slide1 from '../../Assets/Images/images/slider-image-1.jpeg'
import slide2 from '../../Assets/Images/images/slider-image-2.jpeg'
import slide3 from '../../Assets/Images/images/slider-image-3.jpeg'
import blog1 from'../../Assets/Images/blog-img-1.jpeg'
import blog2 from'../../Assets/Images/blog-img-2.jpeg'
import Slider from 'react-slick'
import { useMediaQuery } from 'react-responsive'




export default function MainSlider() {
    const isScreenSmall = useMediaQuery({maxWidth:576})
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:1000
      };



    return <>  
    <div className="row gx-0 my-5 justify-content-center">
        <div className="col-md-10">
        <Slider {...settings}>
            <img height={400} className="w-100" src={slide1} alt="" />
            <img height={400} className="w-100" src={slide2} alt="" />
            <img height={400} className="w-100" src={slide3} alt="" />
        </Slider>
        </div>


        {isScreenSmall?<> <div className="row p-0">
            <div className="col-6 p-0">
            <img className="w-100" src={blog1} alt="" height={150} />
           
            </div>
            <div className="col-6 p-0">
            <img className="w-100" src={blog2} alt="" height={150} />
            </div>
        </div></> : <>
        <div className="col-md-2">
            <img className="w-100" src={blog1} alt="" height={200} />
            <img className="w-100" src={blog2} alt="" height={200} />
        </div>
        </>}
       
       
    </div>
    </>
}

