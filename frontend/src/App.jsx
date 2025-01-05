import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import Homepage from './pages/Homepage'
import Bio from './pages/Bio'
import Dates from './pages/Dates'
import Lovelist from './pages/Lovelist'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/dates" element={<Dates />} />
          <Route path="/lovelist" element={<Lovelist />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
