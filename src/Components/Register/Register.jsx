import React , {useState} from 'react'
import Style from './Register.module.css'
import { Formik , useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import register from '../../Assets/Images/Sign up-cuate.png'



export default function Register() {  
    let navigate = useNavigate()
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(false)
    const [visible, setvisible] = useState(false)
    const [repassvisible, setrepassvisible] = useState(false)

    async function submitRegister(values){
        setloading(true)
       let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
       .catch(
            (err) => {
                setloading(false)
                seterror(err.response.data.message)
            }
        )
       if (data.message === "success") {
        setloading(false)
         navigate('/login')
       }
    }

    const phoneRegex = /^(?:(?:\+|00)20|0)?1\d{9}$/
    let validateSchema = Yup.object({
        name:Yup.string().min(3 , 'Minimum name length is 3.').max(10 , 'Maximum name length is 15.').required('Name is required.'),
        email:Yup.string().email('Email is invalid.').required('Email is required.'),
        phone:Yup.string().matches(phoneRegex, 'Phone number is invalid').required('Phone number is required'),
        password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'Password must starts with uppercase.').required('Password is required.'),
        rePassword:Yup.string().oneOf([Yup.ref("password")] , 'Password and repassword don`t match').required('Repassword is required')
    })

    let formik = useFormik({
        initialValues:{ 
            name:'',
            email:'',
            password:'',
            rePassword:'',
            phone:'',
        }, validationSchema:validateSchema,
        onSubmit:submitRegister
    })

    return <>
 <div className="row">
 <div className="col-md-6 py-4 d-flex flex-column justify-content-center">
    {error?<div className="alert alert-danger">{error}</div>:''}
    <h3 className="text-main fw-bolder pb-5">Register Now</h3>
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name :</label>
        <input type="text" className="form-control mb-2" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.name && formik.touched.name?<div className="alert p-2 mt-2 alert-danger">{formik.errors.name}</div>:''}
        
        
        <label htmlFor="email">Email :</label>
        <input type="email" className="form-control mb-2" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.email && formik.touched.email?<div className="alert p-2 mt-2 alert-danger">{formik.errors.email}</div>:''}

       
        <label htmlFor="password">Password :</label>
        <div className="position-relative">
      <input type={visible? 'text' : 'password'} className="form-control mb-2" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.password && formik.touched.password?<div className="alert p-2 mt-2 alert-danger">{formik.errors.password}</div>:''}
        <div onClick={()=> setvisible(!visible)} className="p-2 position-absolute top-0 end-0">{visible? <><i className="fa-regular fa-eye text-main"></i></>  : <><i className="fa-regular fa-eye-slash text-main"></i></>}</div>

      </div>
        
        <label htmlFor="rePassword">Repassword :</label>
       <div className="position-relative">
       <input type="password" className="form-control mb-2" name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.rePassword && formik.touched.rePassword?<div className="alert p-2 mt-2 alert-danger">{formik.errors.rePassword}</div>:''}
        <div onClick={()=> setrepassvisible(!repassvisible)} className="p-2 position-absolute top-0 end-0">{repassvisible? <><i className="fa-regular fa-eye text-main"></i></>  : <><i className="fa-regular fa-eye-slash text-main"></i></>}</div>

       </div>
        
        <label htmlFor="phone">Phone :</label>
        <input type="tel" className="form-control mb-2" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.phone && formik.touched.phone?<div className="alert p-2 mt-2 alert-danger">{formik.errors.phone}</div>:''}

        {loading? <button type="button" className="bg-main btn text-white mt-2">
            <i className="fas fa-spinner fa-spin"></i>
        </button>: 
         <>
            <div className="d-flex align-items-center justify-content-between">
            <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="bg-main btn text-white mt-2 mx-3">Register</button>
            <div className="d-flex align-items-center pt-3">
                <h6>Already have an account</h6>
                <button className="btn bg-main btn text-white  mx-2">
            <Link to={"/login"} className="text-white">Sign In</Link>
                </button>
            </div>
            </div>
            </>
       }
        
    </form>   
  </div>

       <div className="col-md-6 pt-5">
        <img src={register} className="w-100" alt="" />
       </div>

 </div>
    </>
}

