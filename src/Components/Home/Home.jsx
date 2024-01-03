import React from 'react'
import Style from './Home.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'


export default function Home() {
    return <>
     <Helmet>
                <title>Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    <MainSlider/>
    <CategorySlider/>
    <FeaturedProducts/>
    </>
}

