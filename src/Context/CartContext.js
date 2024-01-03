import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext()
 const headers = {
    token:localStorage.getItem("userToken")
}

    async function addToCart(x){
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
            productId:x
        },
        {
            headers:headers
        }).then((response) => response)
        .catch((error) => error)
    }
    function getLoggedUserCart(){
       return axios.get('https://ecommerce.routemisr.com/api/v1/cart' , {
        headers:headers
       })
       .then((response)=> response)
       .catch((err)=> err)
    }
    function removeCartItem(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
            headers:headers
        })
        .then((response)=> response)
        .catch((err)=> err)
    }

    function updateProductQuantity(id,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
            count:count
        },
        {
            headers:headers
        }
        )
        .then((response)=> response)
        .catch((err)=> err)
    } 
      function clearCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,
        {
            headers:headers
        }
        )
        .then((response)=> response)
        .catch((err)=> err)
    }

    function onlinePayment (cartId , values ) { 
        return axios.post (`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` , 
        {shippingAddress:values} , 
        {headers:headers}
        ).then((response)=>response)
        .catch((err)=>err)
     }
 


export function CartContextProvider(props){
    const [cartId, setcartId] = useState(null)

   async function getCart(){
    let {data} = await getLoggedUserCart();
    setcartId(data?.data._id )
    // console.log(data?.data._id);
   }
   useEffect(()=>{
    getCart();
   } , [])
   

    return <cartContext.Provider value={{cartId , addToCart , getLoggedUserCart , removeCartItem , updateProductQuantity , clearCart , onlinePayment}}>
            {props.children}
    </cartContext.Provider>
}