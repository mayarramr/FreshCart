import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { cartContext } from '../../Context/CartContext'
import emptycart from '../../Assets/Images/Empty-pana.png'
import { Triangle } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'



export default function Cart() {
    let {getLoggedUserCart , removeCartItem , updateProductQuantity , clearCart} = useContext(cartContext)
    const [cartDetails, setCartDetails] = useState(null)
    const [loading, setLoading] = useState(true);
    const isScreenSmall=useMediaQuery({maxWidth:576})
    

    async function getCart(){
        setLoading(true);
      let {data} = await getLoggedUserCart()
      setCartDetails(data)
      console.log(data);
      setLoading(false);
    }

    async function updateCount(id , count){
        let {data} = await updateProductQuantity(id , count)
        setCartDetails(data)
    }

    async function removeItem(id){
        let {data} =await removeCartItem(id)
        setCartDetails(data)
      }

    async function clearcart(){
        let response = await clearCart()
        setCartDetails(null)
        console.log(response);
    }

    useEffect(()=>{
        getCart()
    },[])


    if (loading) {
        // Render loading UI while data is being fetched
        return <>
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
        </div>
        </>;
      }

    return <>
            <Helmet>
                <title>Cart</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>


  { cartDetails ? <div className="container mt-5 pt-1">
  <div className="rounded-3 mt-3 mx-auto p-xl-5 p-3 border-main">
        <div className="text-center pb-3"><h3>Shopping Cart</h3></div>
     <div className="d-flex justify-content-between align-items-center">
     <div>
        <h6 className="text-main fw-bolder">Cart Items : {cartDetails.numOfCartItems}</h6>
        <h6 className="text-main fw-bolder">Total Price : {cartDetails.data.totalCartPrice} EGP</h6>
        </div>
        <button className=" bg-danger text-white btn  " onClick={clearcart}>Clear Cart</button>
 
     </div>
        {cartDetails.data.products.map((product)=> 
        <div className="row my-3 border-bottom pb-2" key={product.product.id}>
            <div className="col-md-2 col-5">
                <img src={product.product.imageCover} className='w-100 rounded-2' alt="" />
            </div>
            <div className="col-md-10 col-7 my-auto p-md-3 p-0">
                <div className="d-flex justify-content-between">
                    <div>
                        <h5>{product.product.title.split(' ').slice(0,3).join(' ')}</h5>
                        <h6  className='text-main'>Price : {product.price}EGP</h6 >
                    </div>

                    <div className="d-flex align-items-center">
                        <button onClick={()=> updateCount(product.product.id , product.count+1)} className="border border-success rounded-2">+</button>
                        <span className="mx-1">{product.count}</span>
                        <button onClick={()=> updateCount(product.product.id , product.count-1)} className="border border-success rounded-2">-</button>
                    </div>
                   
                </div>
                <button className='btn text-danger p-0' onClick={()=>removeItem(product.product.id)}>
                        <i className="fm-sm me-1 fas fa-trash-can text-danger"></i>
                        Remove</button>
                </div>
        </div>
        )}


{isScreenSmall? <div className="d-flex flex-column justify-content-around mt-2">

<Link to={'/address'} className="btn bg-main w-100 text-white">Online Payment</Link>


<button className="btn bg-main w-100 mt-4 text-white">Cash on Delivery</button>

</div> : <>
    <div className="d-flex justify-content-around mt-2">

<Link to={'/address'} className="btn bg-main w-25 text-white">Online Payment</Link>


<button className="btn bg-main w-25 text-white">Cash on Delivery</button>

</div>
</>}
    </div>

  </div> :
  <div>
          <div className="row justify-content-center">
            <div className="col-md-5">
            <img src={emptycart} className="w-100 mt-5" alt="" />
            </div>
          </div>
          <h2 className="text-center">YOUR CART IS EMPTY.</h2>
        </div>
  }
    </>
}

