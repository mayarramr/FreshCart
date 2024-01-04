import React, { useState } from 'react'
import Style from './ChangePass.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import key from '../../Assets/Images/Key-rafiki.png'
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';


const headers = {
    token:localStorage.getItem("userToken")
}

export default function ChangePass() {
    let navigate = useNavigate()

   
    const [error, seterror] = useState(null)
    const [currentVisible, setCurrentVisible] = useState(false)
    const [visible, setVisible] = useState(false)
    const [rePassVisible, setRePassVisible] = useState(false)
    const [loading, setloading] = useState(false)

    

    async function changerUserPass(values){
        try {
            setloading(true);
            let response = await axios.put(
              'https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',
              values,
              { headers: headers }
            );
          
            if (response.data.message === 'success') {
              // Password changed successfully
              setloading(false);
              console.log('changed');
              navigate('/login')
            } else {
              console.log(response.data);
            }
          } catch (error) {
            // Handle the error
            console.log(error.response.data.errors.msg);
            setloading(false);
            seterror(error.response.data.errors.msg)
          }
          

    }
    let validateSchema = Yup.object({
        password:Yup.string().matches(/^(?=.*[A-Z])[A-Za-z0-9]{8,}$/, 'Password must starts with uppercase.').required('Password is required.'),
        rePassword:Yup.string().oneOf([Yup.ref("password")] , 'Password and repassword don`t match').required('Repassword is required')
    })

    let changePass =  useFormik({
        initialValues :{
            currentPassword : '',
            password : '' , 
            rePassword : ''
        }, validationSchema:validateSchema,
        onSubmit:changerUserPass
    })


    const passnotify = () => toast(<>
      <i className="fa-solid fa-circle-check text-main mt-1 me-1"></i>
      Please login with your new password.
      </>
      );

    return <>
     <Helmet>
                <title>Change Password</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    <div className="row mt-4">
      <div className="col-md-3 mx-auto d-flex justify-content-center">
        <img src={key} className="w-100" alt="" />
      </div>
    </div>
    <div className="row justify-content-center">
  <div className="col-md-8 ">
    {error?<div className="alert alert-danger">{error}</div>:
    <>
    {()=>passnotify()}
    </>
    }
   
    <form onSubmit={changePass.handleSubmit}>
        
        
        <label htmlFor="currentPassword">Current Password :</label>
       <div className="position-relative">
       <input type={currentVisible? 'text' : 'password'} className="form-control mb-2" name="currentPassword" id="currentPassword" value={changePass.values.currentPassword} onChange={changePass.handleChange} onBlur={changePass.handleBlur}/>
        {changePass.errors.currentPassword && changePass.touched.currentPassword?<div className="alert p-2 mt-2 alert-danger">{changePass.errors.currentPassword}</div>:''}
        <div onClick={()=> setCurrentVisible(!currentVisible)} className="p-2 position-absolute top-0 end-0">{currentVisible? <><i className="fa-regular fa-eye text-main"></i></>  : <><i className="fa-regular fa-eye-slash text-main"></i></>}</div>

       </div>
       
      <div className="my-4">
      <label htmlFor="password">New Password :</label>
      <div className="position-relative">
      <input type={visible? 'text' : 'password'} className="form-control mb-2" name="password" id="password" value={changePass.values.password} onChange={changePass.handleChange} onBlur={changePass.handleBlur}/>
        {changePass.errors.password && changePass.touched.password?<div className="alert p-2 mt-2 alert-danger">{changePass.errors.password}</div>:''}
        <div onClick={()=> setVisible(!visible)} className="p-2 position-absolute top-0 end-0">{visible? <><i className="fa-regular fa-eye text-main"></i></>  : <><i className="fa-regular fa-eye-slash text-main"></i></>}</div>

      </div>
      </div>


        <label htmlFor="password">RePassword :</label>
      <div className="position-relative">
      <input type={rePassVisible? 'text' : 'password'} className="form-control mb-2" name="rePassword" id="rePassword" value={changePass.values.rePassword} onChange={changePass.handleChange} onBlur={changePass.handleBlur}/>
        {changePass.errors.rePassword && changePass.touched.rePassword?<div className="alert p-2 mt-2 alert-danger">{changePass.errors.rePassword}</div>:''}
        <div onClick={()=> setRePassVisible(!rePassVisible)} className="p-2 position-absolute top-0 end-0">{rePassVisible? <><i className="fa-regular fa-eye text-main"></i></>  : <><i className="fa-regular fa-eye-slash text-main"></i></>}</div>

      </div>


        {loading? <button type="button" className="bg-main btn text-white mt-2">
            <i className="fas fa-spinner fa-spin"></i>
        </button>:
          <div className="d-flex justify-content-center mt-5">
           <button
  onClick={() => {
    if (!(changePass.isValid && changePass.dirty)) {
      passnotify();
    }
    
  }}
  disabled={!(changePass.isValid && changePass.dirty)}
  type="submit"
  className="bg-main btn text-white mt-2"
>
  Save Password
</button>
          </div>
       }

    </form>   
  </div>
  </div>
    </>
}

