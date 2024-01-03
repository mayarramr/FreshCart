import axios from "axios";
import { createContext, useState } from "react";


const headers = {
    token:localStorage.getItem("userToken")
}
export let userContext = createContext()

export default function UserContextProvider(props){
    const [userToken, setUserToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginPassword, setloginPassword] = useState(null)
  

    async function changePass(values){
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword` , values 
        ,{headers:headers}
        ).then ((response)=>response)
         .catch ((error)=>error) 
    }

    const setLoginPasswordValue = (password) =>{
        setloginPassword(password)
    }

    return<>
    <userContext.Provider value={{loginPassword , setLoginPasswordValue , userToken , setUserToken , setUserData , userData , changePass , isAuthenticated , setIsAuthenticated}}>
        {props.children}
    </userContext.Provider>

    </>
}