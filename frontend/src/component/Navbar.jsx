import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <>
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link exact to="/">HOME</Link></li>
                <li><Link to="/bio">BIO</Link></li>
                <li><Link to="/dates">DATES</Link></li>
                <li><Link to="/lovelist">LOVELIST</Link></li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar
