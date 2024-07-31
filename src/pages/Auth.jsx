import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Auth({register}) {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    username : "",
    email : "",
    password :""
  })
  console.log(userDetails);

  const handleRegister = async()=>{
    const {username, email, password} = userDetails
    if(!username || !email || !password){
    toast.info('Please fill the form completely')
    }
    else{
      const result = await registerApi(userDetails)
      console.log(result);

      if(result.status==200){
        toast.success('Registration successful')
        navigate('/login')
      }
      else{
        toast.error('Something went wrong .Please try after sometime')
      }
    }
  }
    
     const handleLogin = async()=>{
    const {email, password} = userDetails
    if(!email || !password){
      toast.info('Please fill the fields completely')
    }
    else{
      const result = await loginApi({email,password})
      console.log(result);

      if(result.status==200){
        toast.success('Login Successful')
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)
        setUserDetails({
          username : "",
          email : "",
          password :""
        })
       
       setTimeout(()=>{
        navigate('/')
       },2000)

      }
      else{
        toast.error(result.response.data)
      }
    }
   
  
  } 

  

  return (
    <div className='container-fluid d-flex justify-content-center align-items-center flex-column' style={{height:'100vh'}}>
      <div className='container w-75'>
        <Link to={'/'} className='text-warning fs-5' style={{textDecoration:'none'}}><FontAwesomeIcon icon={faArrowLeft} className='me-3'/>Back to home</Link>
        <div className=' bg-success p-3 mt-2 rounded'>
          <Row>
            <Col sm={12} md={6} className='p-5 d-flex justify-content-center align-items-center'>
            <img src="https://cdn-icons-png.freepik.com/256/295/295128.png?semt=ais_hybrid" alt="no image" className='w-75' />
            </Col>
            <Col sm={12} md={6} className='d-flex justify-content-center align-items-center text-light flex-column'>
            <h3><FontAwesomeIcon icon={faStackOverflow} className='me-3'/>Project Fair</h3>
            {register?<h5>Sign Up to your account</h5>:
            <h5>Sign In to your account</h5>}
  
            <form className='mt-4 w-75'>
              {register && <div className="mb-3">
                <input type="text" placeholder='Username'className='form-control' onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})} />
              </div>}
              <div className="mb-3">
                <input type="text" placeholder='Email' className='form-control' onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} />
              </div>
              <div className="mb-3">
                <input type="text" placeholder='Password' className='form-control' onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} />
              </div>
              <div className="mb-3">
              {register? <div>
                  <button type='button' className='btn btn-warning w-100' onClick={handleRegister}>Register</button>
                  <p>Already a User? Click here to <Link to={'/login'} className='text-danger'>login</Link></p>
               </div>:
               <div>
                  <button type='button' className='btn btn-warning w-100 mt-3' onClick={handleLogin}>Login</button>
                  <p>New User? Click here to <Link to={'/register'} className='text-danger'>Register</Link></p>
               </div>}
              </div>
            </form>  
            </Col>
          </Row>
         
      </div>
      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </div>
   
  )
}

export default Auth