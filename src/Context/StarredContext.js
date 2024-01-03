import axios from "axios";
import { createContext } from "react";


export let starredContext = createContext()
let headers = {
    token:localStorage.getItem("userToken")
}

async function addToStarred(x) { 
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , 
    {productId:x},
    {headers:headers}
    ).then((response) => response)
    .catch((err) => err)
 }
 function removeFromStarred(id) { 
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` , 
    {headers:headers},
    {productId:id}
    ).then((response) => response)
    .catch((err) => err)
 }

  function getLoggedUserWishlist(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist' , 
    {headers:headers},
    
    )
    .then((response)=> response)
    .catch((err)=>err)
 }




 export function StarredContextProvider(props){
    return <starredContext.Provider value={{addToStarred , getLoggedUserWishlist , removeFromStarred}}>
        {props.children}
    </starredContext.Provider>
 }