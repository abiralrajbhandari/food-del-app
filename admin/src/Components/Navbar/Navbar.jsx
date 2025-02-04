import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
function Navbar() {
  return (
    <div className='navbar'>
      {/* <img src={assets.logo} alt="" className="logo" /> */}
      <p className="logo" style={{color: "black"}} ><span style={{color: "#D21B26"}}>Road</span>House</p>
      <img src={assets.profile_image} alt="" className="profile" />
      
    </div>
  )
}

export default Navbar
