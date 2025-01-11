import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <>
        <nav className="navbar">
            <ul className="nav-links">
                <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>ORNELLA</NavLink></li>
                <li><NavLink to="/bio" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>Bio</NavLink></li>
                <li><NavLink to="/dates" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>Dates</NavLink></li>
                <li><NavLink to="/lovelist" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>Lovelist</NavLink></li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar
