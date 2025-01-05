import React from 'react'
import { urlFor } from '../imageUrl'
import './Modal.css'

function Modal({ project, onClose }) {
  return (
    <>
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-grid">
                    <div className="gallery">
                        {project.images && project.images.map((image, index) => (
                            <img key={index} src={urlFor(image).width(300).url()}
                            alt={'Gallery ${index}'} className="gallery-image" />
                        ))}
                    </div>
                    <div className="info">
                        <h2>{project.title}</h2>
                        <p>{project.genre}</p>
                        {project.duration && <p>{project.duration}</p>}
                        {project.country && <p>{project.country}</p>}
                        {project.publisher && <p>{project.publisher}</p>}
                        <p>{project.year}</p>
                        <p>{project.description}</p>
                        <button className="close-button" onClick={onClose}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Modal
