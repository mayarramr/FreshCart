import React, { useContext, useEffect, useState } from 'react'

import { Triangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { cartContext } from '../../Context/CartContext';
import { starredContext } from '../../Context/StarredContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';




export default function Favorites(){
    let {addToCart} = useContext(cartContext)
    let {getLoggedUserWishlist , removeFromStarred} = useContext(starredContext)
    const [FavDetails, setFavDetails] = useState('')
    const [loading, setLoading] = useState(true);

    async function getWishlist(){
        setLoading(true);
        let {data} = await getLoggedUserWishlist()
        // console.log(data);
        setFavDetails(data)
        setLoading(false);

    }
  

async function removefavItem(id) {
  try {
    await removeFromStarred(id);

    setFavDetails((prevDetails) => {
      const updatedDetails = {
        data: prevDetails.data.filter((item) => item._id !== id),
      };

      // Set FavDetails to null if there are no items remaining
      if (updatedDetails.data.length === 0) {
        return null;
      }
      console.log(FavDetails);
      return updatedDetails;
    });

    console.log('removed success');
    console.log(FavDetails); // This log might not immediately reflect the updated state due to the asynchronous nature of state updates
  } catch (error) {
    console.log('an error occurred:', error);
  }
}
      
    useEffect(()=>{
        getWishlist()
    },[])



    const nofavnotify = () => toast(<>
        <i className="fa-solid fa-circle-check text-main mt-1 me-1"></i>
        Product removed from Favourites 
        </>
        )

    const cartnotify = () => toast(<>
        <i className="fa-solid fa-circle-check text-main mt-1 me-1"></i>
        Product added to cart !
        </>
        )






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
      return (
        <>
          <Helmet>
            <title>Favorites</title>
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
      
          {FavDetails !== null ? (
                <div className="container mt-5 pt-5">
                   <div className="text-center">
                   <h2>FAVORITES</h2>
                   <h5>Find your saved items and get ready to order them.</h5>
                   </div>
               <div className="container p-5">
               <div className="row g-5 gx-5 justify-content-center">
              {FavDetails?.data.map((product) => (
               
                  <div className="col-md-2 m-md-3 col-6 p-3 greenShadow "  key={product._id}>
                   <Link to={`/productdetails/${product._id}`} >
                 <div className="d-flex flex-column justify-content-between">
                 <div className="position-relative">
                   <img src={product.imageCover} className="w-100" alt="" />
                    <h5 className="text-center m-0">{product.title.split(' ').slice(0,3).join(' ')}</h5>
                 <div className="position-absolute end-0 top-0">
                
                 </div>
                 
                   </div>
                   <p className="m-0 text-main fw-bold my-2 text-center">{product.price} EGP</p>
                  
                 </div>
                   </Link>
                   <div className="d-flex justify-content-between">
                   <button className="border border-0 bg-transparent p-0" onClick={()=>{addToCart(product._id);cartnotify();}}><i className=" fa-2x fa-solid fa-cart-plus text-main"></i></button>
                   <button className="border-0 bg-transparent p-2" onClick={() => {removefavItem(product._id);nofavnotify();}}>
                   <lord-icon
                        src="https://cdn.lordicon.com/igciyimj.json"
                        trigger="hover"
                        state="hover-cross"
                        style={{ width: '40px', height: '40px' }}
                    >
                    </lord-icon>
                  </button>
                   </div>
                  </div>
                
               
               
              ))}
               </div>
               </div>
            </div>)
           
           : <h1>NULL</h1> 
           }
        </>
      );
      
}


