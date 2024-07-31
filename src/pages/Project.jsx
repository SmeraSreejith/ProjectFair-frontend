import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { allProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'

function Project() {
  const [token, setToken] = useState("")
  const [allProject, setAllProject] = useState([])
  const [searchkey, setSearchkey] = useState("")

  const getAllProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`

      }
      const result = await allProjectApi(searchkey, reqHeader)
      if (result.status == 200) {
        setAllProject(result.data);
      }
      /*  console.log(result.data); */
    }

  }
  console.log(allProject);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  },[])

  useEffect(() => {
    getAllProject()
  },[searchkey])


  console.log(searchkey);

  return (
    <>
      <Header />
      <h1 className='text-center mt-5'>Projects</h1>

      {token ? <div>
        <div className="row mt-5">
          <div className="col-md-4"></div>
          <div className="col-md-4 d-flex">
            <input type="text" placeholder='Technologies' className='form-control' onChange={(e) => setSearchkey(e.target.value)} />
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginTop: '12px', marginLeft: '-30px' }} flip='horizontal' className='text-secondary' />
          </div>
          <div className="col-md-4"></div>
        </div>

        {allProject?.length > 0 ? <div className='container-fluid mt-5'>
          <div className="row">
            {allProject?.map((item) => (<div className="col-md-4 p-4">
              <ProjectCard projects={item} />
            </div>))}
            <div className="col-md-4"></div>
            <div className="col-md-4"></div>
          </div>
        </div>
          :
          <p className='text-center text-danger mt-5 fs-3'>No Project to display</p>}
      </div>
        :


        <div className="row w-100">
          <div className="col-md-2"></div>
          <div className="col-md-8 d-flex justify-content-center align-items-center flex-column">
            <img src="https://images.squarespace-cdn.com/content/v1/6220ad1db2910108f6cfc24f/46da4dd1-e009-4d51-92bc-7bd013235df1/googlevsprivacy.gif" alt="no image" width={'100%'} height={'400px'} />
            <h4 /* className='mt-4 text-center' */>Please <Link to={'/login'} style={{ color: 'red' }}>Login</Link> To Explore More Projects</h4>
          </div>
          <div className="col-md-2"></div>
        </div>}



    </>

  )
}

export default Project