import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../component/Modal'
import client from '../sanityClient'
import { urlFor} from '../imageUrl'
import './Homepage.css'

export default function Homepage() {
  const [projects, setProjects] = useState([])
  const [selectedFilters, setSelectedFilters] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [isRendering, setIsRendering] = useState(false)
  const [visibleProj, setVisibleProj] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const filterNames = {
    film: 'films',
    book: 'books',
    postpunkpoetry: 'post punk poetry',
  }

  const filterProjectsBySlug = (arr, slug) => {
    return arr.find(obj => obj.slug?.current === slug)
  }

  useEffect (() => {
    client.fetch(
      '*[_type in ["film", "book", "postpunkpoetry"]]|order(_createdAt desc){_id, _type, title, slug, shortsubtitle, extendedsubtitle, coverImage{asset->{url}}, images[]{asset->{url}}, description, visibleLinkName, externalLink}'
    )  
    .then((data) => {
      setProjects(data)
      if (params.slug && params.slug !== "/") {
        const project = filterProjectsBySlug(data, params.slug)
        if (project) handleProjectClick(project)
      }
    })
    .catch(console.error)
    
    requestAnimationFrame(() => setIsReady(true))
  }, [])

  const toggleFilter = (category) => {
    setSelectedFilters((prev) => 
      prev.includes(category) ? prev.filter((filter) => filter !== category) : [...prev, category]
    )
  }

  const handleProjectClick = (project) => {
    navigate(`/${project.slug.current}`)
    if (selectedFilters.length === 0 || selectedFilters.includes(project._type)) {
      setVisibleProj(project)
    }
    setIsVisible(true)
    setIsRendering(true)
    // document.body.style.overflowY = 'hidden'
  }
  
  const onClose = () => {
    setIsVisible(false)
    navigate(`/`)
    // document.body.style.overflowY = 'scroll'
    setTimeout(()=>{
      setIsRendering(false)
    }, 250) // duration should match the animation duration in css
  } 
  const imageUrl = projects.coverImage ? urlFor(projects.coverImage).url() : null

  return (
    <>
    <Helmet>
      <title>ORNELLA</title>
      <meta name="description" content="Ornella Pacchioni website. A list of books, films and poetry projects" />
      <meta name="keywords" content="Ornella, Pacchioni, website, French, author, screenwriter, director, poetry, films, books, projects" />
    </Helmet>
    <div className={`home container ${isReady ? 'mount' : 'unmount'}`}>
      {/* Filter Toggle */}
      <div className="filters">
        {Object.entries(filterNames).map(([category, displayName]) => (
          <button key={category} className={`filter-button ${selectedFilters.includes(category) ? 'active' : ''}`}
          onClick={() => toggleFilter(category)}>
            {displayName}
          </button>
        ))}
      </div>
      {/* Projects Grid */}
      <div className="grid">
        {projects.map((project) => (
          <div key={project._id} className={`grid-item ${
            selectedFilters.length === 0 || selectedFilters.includes(project._type) ? 'highlight' : 'dimmed'
          }`}
          onClick={() => handleProjectClick(project)}>
            <div className="grid-content">
              {selectedFilters.length === 0 ? (
                <>
                <div className='grid-item-text'>
                  <h3 className='title'>{project.title}</h3>
                  <h4 className='subtitle'>{project.shortsubtitle}</h4>
                </div>
                <img src={project.coverImage?.asset?.url} alt={project.title} className="grid-item-image hidden" />
                </>
              ) : selectedFilters.includes(project._type) ? (
                <img src={project.coverImage?.asset?.url} alt={project.title} className="grid-item-image visible fade-in" />
              ) : (
                <div className='grid-item-text dimmed'>
                  <h3 className='title'>{project.title}</h3>
                  <h4 className='subtitle'>{project.shortsubtitle}</h4>
                </div>
              )}
            </div>
          </div>        
        ))}        
      </div>
      
      {isRendering && <Modal project={visibleProj} onClose={onClose} isVisible={isVisible} /> }
    </div>
    </>
    
  )
}