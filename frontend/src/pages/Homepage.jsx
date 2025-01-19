import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../component/Modal'
import client from '../sanityClient'
import { urlFor} from '../imageUrl'
import './Homepage.css'

export default function Homepage() {
  const [projects, setProjects] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [isRendering, setIsRendering] = useState(false)
  const [visibleProj, setVisibleProj] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const navigate = useNavigate();

  useEffect (() => {
    client.fetch(
      '*[_type in ["film", "book", "postpunkpoetry"]]|order(_createdAt desc){_id, _type, title, slug, shortsubtitle, extendedsubtitle, coverImage{asset->{url}}, images[]{asset->{url}}, description, externalLink}'
    )  
    .then(setProjects)
    .catch(console.error)
    
    setIsReady(true)

    return () => {
      setIsReady(false)
    }
}, [])

  console.log(projects)


  const handleProjectClick = (project) => {
    navigate(`/${project.slug.current}`)
    setVisibleProj(project)
    setIsVisible(true)
    setIsRendering(true)
  }

  const onClose = () => {
    // window.history.back()
    setIsVisible(false)
    setTimeout(()=>{
      navigate(`/`)
      setIsRendering(false)
    }, 200)
  } 
  const imageUrl = projects.coverImage ? urlFor(projects.coverImage).url() : null;

  return (
    
    <div className={`container ${isReady ? 'mount' : 'unmount'}`}>
      <div className="grid">
        {projects.map((project) => (
          <div key={project._id} className="grid-item" onClick={() => handleProjectClick(project)}>
            <div className="grid-item-text">            
              <h3 className="title">{project.title}</h3>
              <h4 className="subtitle">{project.shortsubtitle}</h4>
            </div>
            <img src={project.coverImage?.asset?.url} alt={project.title} className="grid-item-image" />
          </div>
        ))}
      </div>
      
      {isVisible && isRendering && <Modal project={visibleProj} onClose={onClose} isVisible={isVisible} /> }
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
