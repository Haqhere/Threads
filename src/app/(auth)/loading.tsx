import React from 'react'
import '../../app/loading.css'

const Loading = () => {

    
  return (
    <div className='load flex justify-center content-center'> 
    <div className="loader">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
    </div>
    </div>
  )
}

export default Loading;