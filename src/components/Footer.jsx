import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'



function Footer() {
  return (
    <div className='container-fluid'>
        <div className='row mt-5 p-3 bg-success'>
      <div className='col-md-4 p-4 ms-md-5'>
        <h4 className='text-light'> <FontAwesomeIcon icon={faStackOverflow} className='me-2 fs-2'/>Project Fair</h4>
        <p style={{textAlign:'justify'}} className='mt-4 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab veniam eos nemo officia commodi corrupti aut tenetur minima, soluta eligendi expedita atque facere reprehenderit, deleniti dolorem suscipit ex laboriosam. Maiores. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, aut ducimus. Enim quam dolore odit quae architecto quod velit illum suscipit magni laboriosam vitae voluptate, vero cumque, alias fuga consectetur.</p>
      </div>
      <div className='col-md-2 p-4 justify-content-center d-md-flex'>
        <div>
            <h4 className='text-white'>Links</h4>
            <p className='mt-4'><Link to={'/'} style={{color:'black'}}>Home Page</Link></p>
            <p><Link to={'/project'} style={{color:'black'}}>Project Page</Link></p>
            <p><Link to={'/dashboard'} style={{color:'black'}}>Dashboard</Link></p>
        </div>
      </div>
      <div className='col-md-2 p-4'>
        <h4 className='text-white'>Guides</h4>
        <p className='mt-4'>React</p>
        <p>React Bootstrap</p>
        <p> Bootswatch</p>
      </div>
      <div className='col-md-3 p-4'>
        <h4 className='text-white'>Contact Us</h4>
        <div className='d-flex mt-4'>
            <input type="text" className='form-control ' placeholder='Email Id' />
            <button className='btn btn-warning border rounded text-white ms-3'>Subscribe</button>
        </div>
        <div className='d-flex mt-4 justify-content-between text-light'>
        <FontAwesomeIcon  icon={faInstagram} size='2xl' />
        <FontAwesomeIcon  icon={faFacebook} size='2xl'  />
        <FontAwesomeIcon  icon={faTwitter} size='2xl' />
        <FontAwesomeIcon  icon={faLinkedin} size='2xl'  />

        </div>
      </div>
      <div className='col-md-1'></div>
    </div>
    </div>
  )
}

export default Footer