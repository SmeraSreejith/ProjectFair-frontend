import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addResponseContext } from '../context/DataShare';

function AddProject() {
  const [show, setShow] = useState(false);

  const[projectDetails , setProjectDetails]=useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projImage:""
  })
  /* console.log(projectDetails); */
  
  const [preview, setPreview] = useState("")
  const [token,setToken] = useState("")
  const {setAddResponse} = useContext(addResponseContext)
 const [key, setKey] = useState(0)

  const handleFile = (e)=>{
  /*   console.log(e.target.files[0]); */
    setProjectDetails({...projectDetails, projImage:e.target.files[0]})
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true)
    handleClose1()
  };
  
   const handleClose1 = () => {
    setProjectDetails({
    title :"",
    language :"",
    github:"",
    website :"",
    overview :"",
    projImage :""
  })
  setPreview("") 
  if(key==0){
    setKey(1)
  }
  else{
    setKey(0)
  }
  }
 

  useEffect(()=>{
   if(projectDetails.projImage){
    //createObjectURL - method used to convert files into urls
    setPreview(URL.createObjectURL(projectDetails.projImage));
   }
  },[projectDetails.projImage])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
        setToken(sessionStorage.getItem("token"))
    }
   
  },[])
  console.log(token);

  /* console.log(preview); */

  const handleAdd =async (e)=>{
    e.preventDefault()

    const{title , language ,github,website,overview,projImage}= projectDetails
    if(!title || !language || !github || !website || !overview || !projImage){
     toast.info('Please fill the form completely')
    }
    else{
      //api
      //inorder to send uploaded content - use formData
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projImage",projImage)

    if(token){
      const reqHeader ={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await addProjectApi(reqBody, reqHeader)
      console.log(result);

       if(result.status==200){
        toast.success('Project Uploaded Successfully')
        handleClose()  
        setAddResponse(result.data)
      } 
    }
    else{
      toast.info ('Please Login')
    }
      
    }
  }
  
  return (
   <>
   <div className='ms-auto'>
      <button className='btn btn-success' onClick={handleShow}>Add Project</button>
      <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title className='text-success'>Add project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={12} md={6}>
              <label htmlFor="projImg">
                <input id='projImg' type="file" style={{display:'none'}} key={key} onChange={(e)=>handleFile(e)}/>
                <img src={preview ? preview : "https://m.media-amazon.com/images/I/71sKzRQtXtL.png" }alt="no image" width={'100%'}/>
              </label>
              </Col>
              <Col sm={12} md={6}>
              <form className='p-3'>
                <div className="mb-3">
                  <input type="text" placeholder='Title' value={projectDetails.title} className='form-control' onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />
                </div>
                <div className="mb-3">
                <input type="text" placeholder='Language' value={projectDetails.language} className='form-control' onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} />
                </div>
                <div className="mb-3">
                <input type="text" placeholder='Github' value={projectDetails.github} className='form-control' onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>
                </div>
                <div className="mb-3">
                <input type="text" placeholder='Website' value={projectDetails.website} className='form-control' onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}/>
                </div>
                <div className="mb-3">
                  <textarea placeholder='Overview' value={projectDetails.overview} className='form-control' rows={'4'} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}></textarea>
                </div>
              </form>
              </Col>
  
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type='button' variant="warning" onClick={handleClose1}>
              Cancel
            </Button>
            <Button type='button' variant="success" onClick={handleAdd}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer theme="colored" position="top-center" autoClose={2000} />
   </div>
   </>
  )
}

export default AddProject