import React from 'react'
import Style from './Categories.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Triangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Categories() {
    function getAllCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    let{isLoading, data}=useQuery('allCategories',getAllCategories)
    // console.log(data?.data.data);


    return <>
    <Helmet>
                <title>Category</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    {isLoading? 
        <div className="position-fixed bottom-0 top-0 start-0 end-0 bg-white d-flex justify-content-center align-items-center">
            <Triangle
            height="80"
            width="80"
            color="#0aad0a"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
            />
        </div>:<><div className="container">
            <div className="row justify-content-around mt-5 pt-5">
                {data?.data.data.map((category)=> <div key={category._id} className={`${Style.categoryitem} col-md-3 col-10 m-3 p-0 m-md-3 overflow-hidden border-main rounded-4`}>
               
              <Link to={`/category/${category._id}`}>
              <div className={`position-relative text-center ${Style.imageeee}`}>
                    <div className={`${Style.sora}`}>
                    <img src={category.image} className="w-100 h-100 rounded-3" alt="" />
                    </div>
                    <div className={`${Style.overlay} position-absolute top-0 end-0 start-0 bottom-0 rounded-3 w-100 mx-auto d-flex align-items-center justify-content-center fs-1 fw-bolder`}> 
                    <div className={`${Style.white}`}>VIEW</div>
                    </div>
               </div>
              </Link>
                    <div><h6 className="text-main fw-bolder p-2 text-center ">{category.name.split(" ").slice(0,2).join(" ")}</h6></div>
                </div> )}
            </div>
        </div>
    </>}
    </>
}


