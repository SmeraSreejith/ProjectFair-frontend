import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'

function Dashboard() {
  const[user,setUser]=useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      setUser(JSON.parse(sessionStorage.getItem("existingUser")).username);
    }
  },[])
  return (
    <>
    <Header dash={true}/>
    
    <h3 className='mt-5 ms-3'> Welcome <span className='text-warning'>{user}</span></h3>

    <Row className='mt-3 container-fluid p-5'>
    <Col sm={12} md={8}>
    <Myproject/>
    </Col>
    <Col sm={12} md={4}>
    <Profile/>
    </Col>
    </Row>
    </>
  )
}

export default Dashboard