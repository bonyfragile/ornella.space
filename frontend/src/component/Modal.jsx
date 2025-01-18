import React, { useState, useRef } from 'react'
import BlockContent from '@sanity/block-content-to-react'
import ReactDom from 'react-dom'
import './Modal.css'

export default function Modal({ project, onClose, isVisible }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const overlayRef = useRef()

    const nextImage = () => 
        setCurrentImageIndex((prev) => 
            prev + 1 === project.images?.length ? 0 : prev + 1
        )

    const prevImage = () => 
        setCurrentImageIndex((prev) =>
        prev === 0 ? project.images?.length - 1 : prev - 1
        )

    const handleOnClick = (e) => {
        if (e.target !== overlayRef.current) return
        onClose()
    }

    return project && ReactDom.createPortal(    
        <div 
            className={`modal-overlay ${isVisible ? 'visible': 'hidden'}`} 
            onClick={handleOnClick} 
            ref={overlayRef}
        >
            <div className={isVisible ? "modal-content" : "modal-content"}>
                {project.images && <div className="modal-gallery">
                    {project.images.length > 1 && 
                        <button className="nav-button left" onClick={prevImage}>&lt;</button> }
                    <img src={project.images[currentImageIndex].asset.url} alt={project.title} className="modal-gallery-image" />
                    {project.images.length > 1 && 
                        <button className="nav-button right" onClick={nextImage}>&gt;</button> }
                </div>}
                <div className="modal-info" style={{width: project.images ? '' : '100%'}}>
                        <h3 className="title">{project.title}</h3>
                        <h4 className="subtitle">{project.extendedsubtitle}</h4>
                        <a href={project.externalLink} target="_blank" rel="noopener noreferrer">{project.externalLink}</a>
                        <div className="description"><BlockContent blocks={project.description} projectId="f588b6e1" dataset="production" /></div>
                    <button className="close-button" onClick={onClose}>Back</button>
                </div>

            </div>    
        </div>,
        document.getElementById('portal')
    )
}
