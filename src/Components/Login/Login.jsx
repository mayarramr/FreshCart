import React , {createContext, useContext, useState} from 'react'
import Style from './Login.module.css'
import { Formik , useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate , Link} from 'react-router-dom'
import { userContext } from '../../Context/UserContext'
import login from '../../Assets/Images/Mobile login-cuate.png'
import { Helmet } from 'react-helmet'
import { useMediaQuery } from 'react-responsive'




export default function Login() { 
    let {setUserToken , setUserData , setIsAuthenticated , setLoginPasswordValue} = useContext(userContext) 
    let navigate = useNavigate()
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(false)
    const [visible, setvisible] = useState(false)
    const isScreenSmall=useMediaQuery({maxWidth:576})

    async function submitLogin(values){
        setloading(true)
       let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
       .catch(
            (err) => {
                setloading(false)
                seterror(err.response.data.message)
            }
        )
       if (data.message === "success") {
        setloading(false)
        localStorage.setItem('userToken' , data.token)
        setUserToken(data.token)
        setUserData(data.user)
        setIsAuthenticated(true)
        setLoginPasswordValue(formik.values.password);
         navigate('/home')
       } 
    }

    let validateSchema = Yup.object({
        email:Yup.string().email('Email is invalid.').required('Email is required.'),
        password:Yup.string().matches(/^(?=.*[A-Z])[A-Za-z0-9]{8,}$/ , 'Password must start with an uppercase letter and be at least 8 characters long.').required('Password is required.'),
    })

    let formik = useFormik({
        initialValues:{ 
            email:'',
            password:'',
        }, validationSchema:validateSchema,
        onSubmit:submitLogin
    })

    return <>
 <Helmet>
                <title>Login</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

<div className="row">
<div className="col-md-6 d-flex align-items-center pt-5">
      <img src={login} className="w-100" alt="" />
    </div>


  <div className="col-md-6 d-flex flex-column justify-content-center">
    {error?<div className="alert alert-danger">{error}</div>:''}
    <h3 className="text-main fw-bolder pb-5">Login Now</h3>
    <form onSubmit={formik.handleSubmit}>
        
        
        <label htmlFor="email">Email :</label>
        <input type="email" className="form-control mb-2" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.email && formik.touched.email?<div className="alert p-2 mt-2 alert-danger">{formik.errors.email}</div>:''}

       
        <label htmlFor="password">Password :</label>
      <div className="position-relative">
      <input type={visible? 'text' : 'password'} className="form-control mb-2" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.password && formik.touched.password?<div className="alert p-2 mt-2 alert-danger">{formik.errors.password}</div>:''}
        <div onClick={()=> setvisible(!visible)} className="p-2 position-absolute top-0 end-0">{visible? <><i className="fa-regular fa-eye text-main"></i></>  : <><i className="fa-regular fa-eye-slash text-main"></i></>}</div>

      </div>

        <div>
            <Link to={'/forgetpassword'}><h6 className="text-main">Forget Password ? </h6> </Link>
        </div>


        {loading? <button type="button" className="bg-main btn text-white mt-2">
            <i className="fas fa-spinner fa-spin"></i>
        </button>:<>

           {isScreenSmall? <div className="d-flex flex-column align-items-center">
           <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="bg-main btn text-white mt-2 mx-3">Login</button>
           <div className="d-flex align-items-center pt-3">
               <h6>Don't have an account yet ?</h6>
               <button className="btn bg-main btn ">
           <Link to={"/register"} className="text-white">Sign Up</Link>
               </button>
           </div>
           </div>
           :
           <>
            <div className="d-flex align-items-center justify-content-between">
            <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="bg-main btn text-white mt-2 mx-3">Login</button>
            <div className="d-flex align-items-center pt-3">
                <h6>Don't have an account yet ?</h6>
                <button className="btn bg-main btn ">
            <Link to={"/register"} className="text-white">Sign Up</Link>
                </button>
            </div>
            </div>
           </>}
           </>
       }

    </form>   
  </div>
</div>
    </>
}

