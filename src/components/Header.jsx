import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

function Header({dash}) {
 
  const navigate = useNavigate()

  const handleLogout = ()=>{
    navigate('/')
    sessionStorage.removeItem('token')
  }
  
  return (
    <Navbar className="bg-success">
    <Container>
      <Link to={'/'} style={{textDecoration:'none'}}>
        <Navbar.Brand className='text-light fs-4'>
          <FontAwesomeIcon icon={faStackOverflow} className='fa-2x me-3'/>
          Project Fair
        </Navbar.Brand>
      </Link>
     { dash && <button type='button' className='btn btn-warning' onClick={handleLogout}><FontAwesomeIcon icon={faPowerOff} className='me-2'/>Logout</button> }
    </Container>
  </Navbar>
  )
}

export default Header