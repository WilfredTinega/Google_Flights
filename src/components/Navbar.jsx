import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex gap-2'>
        <NavLink to='/' >Home</NavLink>    
        <NavLink to='nearby'>airports</NavLink> 
        <NavLink to='flights'>flights</NavLink> 
        <NavLink to='hotels'>flights</NavLink>
    </div>
  )
}

export default Navbar
