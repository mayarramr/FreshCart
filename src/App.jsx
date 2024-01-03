import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import { CartContextProvider } from './Context/CartContext';
import { StarredContextProvider } from './Context/StarredContext';
import UserContextProvider from './Context/UserContext';

import './App.css';
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import NotFound from './Components/NotFound/NotFound'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Profile from './Components/Profile/Profile';
import Favorites from './Components/Favorites/Favorites';
import ForgetPass from './Components/ForgetPass/ForgetPass'
import ChangePass from './Components/ChangePass/ChangePass';
import Address from './Components/Address/Address';
import AllOrders from './Components/AllOrders/AllOrders';
import { useEffect } from 'react';

let routers = createBrowserRouter([
  {path :'/' , element :<Layout/> , children:[
    {index:true , element:<ProtectedRoute><Login/></ProtectedRoute>},
    {path:'login' , element:<Login/>},
    {path:'register' , element: <Register/>},
    {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute> },
    {path:'home' , element:<ProtectedRoute><Home/></ProtectedRoute> },
    {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute> },
    {path:'favorites' , element:<ProtectedRoute><Favorites/></ProtectedRoute> },
    {path:'profile' , element:<ProtectedRoute><Profile/></ProtectedRoute> },
    {path:'forgetpassword' , element:<ForgetPass/>},
    {path:'changepassword' , element:<ProtectedRoute><ChangePass/></ProtectedRoute> },
    {path:'address' , element:<ProtectedRoute><Address/></ProtectedRoute> },
    {path:'allorders' , element:<ProtectedRoute><AllOrders/></ProtectedRoute> },
    {path:'productdetails/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute> },
    {path:'*' , element:<NotFound/>},
  ]}
])

export default function App() {
  return <>

  <StarredContextProvider>
  <CartContextProvider>
  <UserContextProvider>
      <RouterProvider router={routers}></RouterProvider>
  </UserContextProvider>
  </CartContextProvider>
  </StarredContextProvider>
  
 
  </>
    
}


