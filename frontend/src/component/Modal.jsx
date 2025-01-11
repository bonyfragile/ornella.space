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
            <div className="modal-grid">       
                <div className="modal-gallery">
                    {project.images?.length > 0 ? (
                        <>
                            <button className="nav-button left" onClick={prevImage}>&lt;
                            </button>
                            <img src={project.images[currentImageIndex].asset.url} alt={project.title} className="modal-gallery-image" />
                            <button className="nav-button right" onClick={nextImage}>&gt;                                
                            </button>
                        </>
                    ) : (
                        <p>No images available</p>
                    )}
                </div>

                <div className="modal-info">
                    <div className="title">{project.title}</div>
                    <div className="subtitle">{project.genre},
                    {project.duration && <span>{project.duration},</span>}
                    {project.country && <span>{project.country},</span>}
                    {project.publisher && <span>{project.publisher},</span>}         
                    <span>{project.year}</span></div>
                    <a href={project.externalLink} target="_blank" rel="noopener noreferrer">Follow link</a>
                    <BlockContent blocks={project.description} projectId="f588b6e1" dataset="production" className="description" />
                    <button className="close-button" onClick={onClose}>Back</button>
                </div>
            </div>      
        </div>    
    </div>,
    document.getElementById('portal')
  )
}
