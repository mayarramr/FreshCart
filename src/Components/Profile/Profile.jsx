import React, { useContext, useEffect } from 'react'
import Style from './Profile.module.css'
import jwtDecode from 'jwt-decode'
import { userContext } from '../../Context/UserContext'

export default function Profile() {
    const { userData , isAuthenticated } = useContext(userContext);

    useEffect(() => {
        const updateLocalStorage = () => {
            // Check if userData exists and the user is authenticated
            if (userData && isAuthenticated) {
              // Save user data to local storage
              localStorage.setItem('userName', userData.name);
              localStorage.setItem('userEmail', userData.email);
            }
      
            // Decode and log the token if needed
            const encodedToken = localStorage.getItem('userToken');
            const decodedToken = jwtDecode(encodedToken);
            console.log(decodedToken);
          };
      
          // Call the function to update local storage
          updateLocalStorage();
         }, [userData]); // Include userData in the dependency array to trigger the effect when userData changes

    return (
        <div className='mt-5 pt-5'>
            <h1>Hello {localStorage.getItem('userName')}</h1>
            <h3>Your email is: {localStorage.getItem('userEmail')}</h3>
        </div>
    );
}


