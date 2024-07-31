import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProfileApi } from '../services/allApi';

function Profile() {
  const [open, setOpen] = useState(false);
  console.log(open);

  const [userDetails, setUserDetails] = useState({
    username : "",
    email : "",
    password :"",
    github :"",
    linkedin : "",
    profile :""
  })
  
  const[existingImage , setExistingImage] = useState("")

  const [preview , setPreview] = useState("")

  const[editStatus,setEditStatus] = useState(false)

  useEffect (()=>{
    if(sessionStorage.getItem("existingUser")){
         const user = JSON.parse(sessionStorage.getItem("existingUser"))
         setUserDetails({...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin})
         setExistingImage(user.profile)
    }
  },[editStatus])

  const handleProfileFile = (e)=>{
    e.preventDefault()
    setUserDetails({...userDetails, profile:e.target.files[0]})
  }

  useEffect(()=>{
   if(userDetails.profile){
    setPreview(URL.createObjectURL(userDetails.profile))
   }
   else{
    setPreview("")
   }
  },[userDetails.profile])

  const handleProfileUpdate = async()=>{
    const {username , email , password , github , linkedin , profile} = userDetails
    if(!username || !email || !password || !github || !linkedin){
        toast.info('Please fill the input fields')   
    }
    else{
      const reqBody = new FormData()
     reqBody.append("username",username)
     reqBody.append("email",email)
     reqBody.append("password",password)
     reqBody.append("github",github)
     reqBody.append("linkedin",linkedin)
     profile?reqBody.append("profile",profile):reqBody.append("profile",existingImage)

    const token = sessionStorage.getItem("token")

    if(preview){
      const reqHeader ={
        "Content-Type":"multipart/form-data",
       "Authorization":`Bearer ${token}`
     }
     const result = await editProfileApi(reqBody,reqHeader)

     console.log(result);

     if(result.status==200){
      toast.success('profile updated successfully')
      sessionStorage.setItem("existingUser",JSON.stringify(result.data))
      setEditStatus(true)
     }
     else{
        toast.error('something went wrong')
     }
    }
    else{
      const reqHeader ={
        "Content-Type":"application/json",
       "Authorization":`Bearer ${token}`
     }
     const result = await editProfileApi(reqBody,reqHeader)

     console.log(result);

     if(result.status==200){
      toast.success('profile updated successfully')
      sessionStorage.setItem("existingUser",JSON.stringify(result.data))
      setEditStatus(true)
     }
     else{
        toast.error('something went wrong')
     }
    }
    }
  }

  return (
    <>
      <div className='rounded shadow  mx-md-3 p-4 'onMouseEnter={()=>setOpen(true)}>
        <div className='d-flex justify-content-between mt-3'>
          <h4 className='text-success'>Profile</h4>
          <button onClick={() => setOpen(!open)} className='btn btn-outline-info'>
            {!open ? <FontAwesomeIcon icon={faAngleDown} />
              :
              <FontAwesomeIcon icon={faAngleUp} />}
          </button>
        </div>

        <Collapse in={open}>
          <div>
            <div className='d-flex justify-content-center align-items-center flex-column'>
              <label htmlFor="profileImg">
                <input id='profileImg' type="file" style={{ display: 'none' }}  onChange={(e)=>handleProfileFile(e)}/>
                {existingImage==""?
                <img src={preview?preview:"https://static.vecteezy.com/system/resources/thumbnails/018/742/015/small_2x/minimal-profile-account-symbol-user-interface-theme-3d-icon-rendering-illustration-isolated-in-transparent-background-png.png"} alt="no image" style={{ width: '170px', height: '170px', borderRadius: '50%' }} />
              :
              <img src={preview?preview:`${serverUrl}/uploads/${existingImage}`}alt="no image" style={{ width: '170px', height: '170px', borderRadius: '50%' }} />
              }
              
              </label>
              <form className="mt-4 w-100">
                <div className="mb-3">
                  <input type="text" className='form-control' placeholder='GitHub' value={userDetails.github} onChange={(e)=>setUserDetails({...userDetails,github:e.target.value})}/>
                </div>
                <div className="mb-3">
                  <input type="text" className='form-control' placeholder='LinkedIn' value={userDetails.linkedin} onChange={(e)=>setUserDetails({...userDetails,linkedin:e.target.value})} />
                </div>
                <div className="mb-3">
                  <button type='button' className='btn btn-success w-100' onClick={handleProfileUpdate}>Update</button>
                </div>
              </form>

            </div>
          </div>
        </Collapse>

      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />

    </>
  )
}

export default Profile