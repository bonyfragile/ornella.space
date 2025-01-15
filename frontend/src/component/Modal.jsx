import React, { useState } from 'react'
import BlockContent from '@sanity/block-content-to-react'
import ReactDom from 'react-dom'
import './Modal.css'

export default function Modal({ project, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const nextImage = () => 
        setCurrentImageIndex((prev) => 
            prev + 1 === project.images?.length ? 0 : prev + 1
    )

    const prevImage = () => 
        setCurrentImageIndex((prev) =>
        prev === 0 ? project.images?.length - 1 : prev - 1
    )

  return ReactDom.createPortal(    
    <div className="modal-overlay">
        <div className="modal-content">
            {project.images && <div className="modal-gallery">
                {project.images.length > 1 && 
                    <button className="nav-button left" onClick={prevImage}>&lt;</button> }
                <img src={project.images[currentImageIndex].asset.url} alt={project.title} className="modal-gallery-image" />
                {project.images.length > 1 && 
                    <button className="nav-button right" onClick={nextImage}>&gt;</button> }
                {/* {project.images?.length > 0 ? (
                    <>
                        <button className="nav-button left" onClick={prevImage}>&lt;
                        </button>
                        <img src={project.images[currentImageIndex].asset.url} alt={project.title} className="modal-gallery-image" />
                        <button className="nav-button right" onClick={nextImage}>&gt;                                
                        </button>
                    </>
                ) : (
                    <p>No images available</p>
                )} */}
            </div>}
            <div className="modal-info" style={{width: project.images ? '' : '100%'}}>
                <div className="text"> 
                    <h3 className="title">{project.title}</h3>
                    <h4 className="subtitle">{project.extendedsubtitle}</h4>
                    <a href={project.externalLink} target="_blank" rel="noopener noreferrer">Follow link</a>
                    <div className="description"><BlockContent blocks={project.description} projectId="f588b6e1" dataset="production" /></div>
                </div>
                <button className="close-button" onClick={onClose}>Back</button>
            </div>

        </div>    
    </div>,
    document.getElementById('portal')
  )
}
