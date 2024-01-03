import React, { useContext, useEffect, useState } from 'react'
import Style from './FeaturedProducts.module.css'
import axios from 'axios'
import { Triangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { starredContext } from '../../Context/StarredContext'
import { useMediaQuery } from 'react-responsive'




export default function FeaturedProducts() {
// const [products, setproducts] = useState([]) 

let {addToCart} = useContext(cartContext)
let {addToStarred} = useContext(starredContext)
const isScreenSmall = useMediaQuery({maxWidth:576})
const isScreenMeduim = useMediaQuery({minWidth:576})


async function addProductToStarred(id){
    let response = await addToStarred(id)
    console.log(response);
}

async function addProduct(id){
    let response = await addToCart(id)
    // console.log(response);
}
function getProducts(){
return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
}

let {isError , isLoading , data , isFetching , } = useQuery('featuredProduct' , getProducts)
// console.log(data?.data.data); 



//     async function getProduct (){
//      let {data} =  await axios.get('https://ecommerce.routemisr.com/api/v1/products')
//      console.log(data);
//      setproducts(data.data)
//      setisloading(false)
//     }


// useEffect(()=>{
//     getProduct()
// },[])

const notify = () => toast(<>
<i className="fa-solid fa-circle-check text-main mt-1 me-1"></i>
Product Added to Cart !
</>
);

const favnotify = () => toast(<>
    <i className="fa-solid fa-circle-check text-main mt-1 me-1"></i>
    Product Added to Favourites !
    </>
    )
    return <>
    <div className="container">
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
        </div>: 
        <div className="row">
            {data?.data.data.map((product)=> <div key={product._id} className="col-md-2 col-6 overflow-hidden product p-3 my-3">
               
               <Link to={`/productdetails/${product.id}`}>
               <img className="w-100" src={product.imageCover} alt="" />
           
                <p className="text-main">{product.category.name}</p>
                <h3>{product.title.split(" ").slice(0,2).join(" ")}</h3>
                <div className="d-flex justify-content-between">
                    <p>{product.price} EGP</p>
                   <p>
                    <i className="rating-color fa fa-star"></i>
                    {product.ratingsAverage}
                   </p>
                </div>
               </Link>
               <div className="d-flex align-items-center">
                {isScreenSmall?<button onClick={() => {addProduct(product._id);notify();}} className="btn bg-main text-white border-0"><h6 className="m-0">Add To Cart</h6></button>
              :<button onClick={() => {addProduct(product._id);notify();}} className="btn bg-main text-white w-100">Add To Cart</button>
            }
               <button onClick={() => {addProductToStarred(product._id);favnotify();}} className="border border-0 bg-transparent">
               <lord-icon
    src="https://cdn.lordicon.com/igciyimj.json"
    trigger="hover"
    style={{width:'40px',height:'40px'}}>
</lord-icon>
                </button>
               </div>
            </div>)}
           
        </div>}
       
    </div>
    </>
}

