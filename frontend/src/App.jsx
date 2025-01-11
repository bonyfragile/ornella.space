import './App.css'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import Homepage from './pages/Homepage'
import Bio from './pages/Bio'
import Dates from './pages/Dates'
import Lovelist from './pages/Lovelist'
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/dates" element={<Dates />} />
          <Route path="/lovelist" element={<Lovelist />} />
          {/* Dynamic route for slugs */}
          <Route path="/:slug" element={<Homepage />} />
          {/* Catch-all route for unmatched paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
