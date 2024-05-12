import React from 'react'
import "./adbar.scss"

const Adbar = () => {
  return (
    <div className='adbar'>
      <div className='adbarcontainer'>
        <div className='left'>
            <a >
                <img src="assets/logo.png" alt="CSEDU" />
            </a>
        </div>
        <div className='right'>
            <a >
                <img src="assets/arong.png" alt="add" />
            </a>
        </div>
      </div>
    </div>
  )
}

export default Adbar
