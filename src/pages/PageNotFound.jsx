import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


function PageNotFound() {
  return (
    <div className="row w-100">
        <div className="col-md-3"></div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
         <div style={{width:'100%'}} className='d-flex justify-content-center align-items-center flex-column'>
          <img src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif" alt="no image" width={'100%'}/>
          <h1>Looks Like You're Lost</h1>
          <button className='btn btn-success mt-3'><FontAwesomeIcon icon={faArrowLeft} className='me-2'/>Back Home</button>
         </div>
        </div>
        <div className="col-md-3"></div>
    </div>


    
  )
}

export default PageNotFound