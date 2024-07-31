import React, { useContext, useEffect, useState } from 'react'
import AddProject from '../components/AddProject'
import EditProject from '../components/EditProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { deleteProjectApi, userProjectApi } from '../services/allApi'
import { addResponseContext, editResponseContext } from '../context/DataShare'
import { Link } from 'react-router-dom'

function Myproject() {
  
  const[userProject , setUserProject] = useState([])
  const{addResponse} = useContext(addResponseContext)
  const[deleteStatus , setDeleteStatus]= useState(false)
  const {editResponse} = useContext(editResponseContext)

  const getUserProject = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
   
      }
      const result = await userProjectApi(reqHeader)
     setUserProject(result.data);
      /* console.log(result); */
    }
  }
  console.log(userProject);

  const handleDelete = async(id)=>{
    const result = await deleteProjectApi(id)
    console.log(result);
    if(result.status==200){
      setDeleteStatus(true)
    }
  }

  useEffect(()=>{
    getUserProject()
    setDeleteStatus(false)
  },[addResponse,deleteStatus, editResponse])

 
  return(
    <>
    <div className='shadow px-4 py-4 rounded'>
      <div className='d-flex justify-content-between'>
        <h4 className='text-success'>My Projects</h4>
        <AddProject/>       
      </div>

    { userProject?.length>0 ?
    userProject?.map((item)=>( <div className='mt-4 bg-light p-3 rounded d-flex justify-content-between'>
      <h5>{item.title}</h5>
      <div className='d-flex align-items-center'>
        <EditProject project={item}/>
        <Link to={item?.website} target='_blank'>
                <FontAwesomeIcon
                  icon={faGlobe}
                  className="ms-3 text-warning"
                />
              </Link>
              <Link to={item?.github} target='_blank'>
                <FontAwesomeIcon
                  icon={faGithub}
                  className="ms-3 text-success"
                />
              </Link>
              <FontAwesomeIcon
                icon={faTrash}
                className="text-danger ms-3 me-5" onClick={()=>handleDelete(item?._id)}
              />
      </div>
    </div>))
   
      :<p className='text-danger'>No Project to display</p>}
    </div>
    </>
  )
} 

export default Myproject