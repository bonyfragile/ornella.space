import React, { useState, useRef, useEffect } from 'react'
import BlockContent from '@sanity/block-content-to-react'
import ReactDom from 'react-dom'
import './Modal2.css'
import XIcon from './XIcon'
import ChevronLeft from './ChevronLeft'
import ChevronRight from './ChevronRight'

export default function Modal({ project, onClose, isVisible }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isImageFullScreen, setIsImageFullScreen] = useState(false)
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

    const toggleFullScreen = () => {
        setIsImageFullScreen((prev) => !prev)
    }

    return project && ReactDom.createPortal(    
        <div 
            className={`modal-overlay ${isVisible ? 'visible': 'hidden'}`} 
            onClick={handleOnClick} 
            ref={overlayRef}
        >
            <button className="x-icon" onClick={onClose}><XIcon/></button>

            <div className="modal-content">
                {project.images && <div className="modal-gallery">
                    {project.images.length > 1 && 
                        <button className="nav-button left" onClick={prevImage}>
                            {/* &lt; */}
                            <ChevronLeft />
                        </button> }
                    <img src={project.images[currentImageIndex].asset.url} alt={project.title} className="modal-gallery-image" onClick={toggleFullScreen} />
                    {project.images.length > 1 && 
                        <button className="nav-button right" onClick={nextImage}>
                            {/* &gt; */}
                            <ChevronRight />
                        </button> }
                </div>}
                <div className="modal-info" style={{width: project.images ? '' : '100%'}}>
                    <h3 className="title">{project.title}</h3>
                    <h4 className="subtitle">{project.extendedsubtitle}</h4>
                    {project.externalLink && project.visibleLinkName && (
                        <a href={project.externalLink} target="_blank" rel="noopener noreferrer">{project.visibleLinkName}</a>)}
                    <div className="description"><BlockContent blocks={project.description} projectId="f588b6e1" dataset="production" /></div>
                    {/* <button className="close-button" onClick={onClose}>Back</button> */}
                </div>
            </div>

            {isImageFullScreen && (
                <div className='fullscreen-overlay' onClick={toggleFullScreen}>
                    <img src={project.images[currentImageIndex].asset.url} alt={project.title} className="fullscreen-image" />
                </div>    
            )}  
        </div>,
        document.getElementById('portal')
    )
}
