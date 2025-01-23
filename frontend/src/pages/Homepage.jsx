import React, { useState, useEffect } from 'react'
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
  const navigate = useNavigate();

  const filterNames = {
    film: 'films',
    book: 'books',
    postpunkpoetry: 'post punk poetry',
  }

  useEffect (() => {
    client.fetch(
      '*[_type in ["film", "book", "postpunkpoetry"]]|order(_createdAt desc){_id, _type, title, slug, shortsubtitle, extendedsubtitle, coverImage{asset->{url}}, images[]{asset->{url}}, description, visibleLinkName, externalLink}'
    )  
    .then(setProjects)
    .catch(console.error)
    
    requestAnimationFrame(() => setIsReady(true))
}, [])

  console.log(projects)

  const toggleFilter = (category) => {
    setSelectedFilters((prev) => 
      prev.includes(category) ? prev.filter((filter) => filter !== category) : [...prev, category]
    )
  }

  {/*const isFiltered  =  (project) => {
    return selectedFilters.includes(project._type)
  }*/}


  const handleProjectClick = (project) => {
    navigate(`/${project.slug.current}`)
    if (selectedFilters.length === 0 || selectedFilters.includes(project._type)) {
      setVisibleProj(project)
    }
    setIsVisible(true)
    setIsRendering(true)
    document.body.style.overflowY = 'hidden'
  }
  
  const onClose = () => {
    // window.history.back()
    setIsVisible(false)
    navigate(`/`)
    document.body.style.overflowY = 'scroll'
    setTimeout(()=>{
      setIsRendering(false)
    }, 250) // duration should match the animation duration in css
  } 
  const imageUrl = projects.coverImage ? urlFor(projects.coverImage).url() : null;

  return (
    
    // <div className={`home container ${isReady ? 'mount' : 'unmount'}`}>
    //   <div className="grid">
    //     {projects.map((project) => (
    //       <div key={project._id} className="grid-item" onClick={() => handleProjectClick(project)}>
    //         <div className="grid-item-text">            
    //           <h3 className="title">{project.title}</h3>
    //           <h4 className="subtitle">{project.shortsubtitle}</h4>
    //         </div>
    //         <img src={project.coverImage?.asset?.url} alt={project.title} className="grid-item-image" />
    //       </div>
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
            {/*<div className="grid-content">
              {selectedFilters.includes(project.type) ? (
                <img src={project.coverImage?.asset?.url} alt={project.title} className="grid-item-image visible" />
              ) : (
                <div className="grid-item-text">            
                  <h3 className="title">{project.title}</h3>
                  <h4 className="subtitle">{project.shortsubtitle}</h4>
                </div>
              )}            
            </div>*/}
          </div>        
        ))}        
      </div>
      
      {isRendering && <Modal project={visibleProj} onClose={onClose} isVisible={isVisible} /> }
      {/* {setVisibleProj && isVisible && isRendering && <Modal project={visibleProj} onClose={onClose} isVisible={isVisible} /> } */}
      {/* <ProjectModal projects={projects} isVisible={isVisible} /> */}
    </div>
    
  )
}

// const ProjectModal = ({ projects, isVisible }) => {
//   const { slug } = useParams()
//   const project = projects.find((p) => p.slug?.current === slug)

//   if (!project) return null

//   return <Modal project={project} onClose={() => window.history.back()} isVisible={isVisible} />
// }
