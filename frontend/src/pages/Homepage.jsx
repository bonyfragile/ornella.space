import React, { useState, useEffect } from 'react'
import client from '../sanityClient'

export default function Homepage() {
  const [projects, setProjects] = useState([])

  useEffect (() => {
    client.fetch('*[_type in ["film", "book", "poetry"]]|order(_createdAt desc){title, genre, year, coverImage}')
    .then ((data) => setProjects(data))
  }, [])

  return (
    <div className="grid-container">
      {projects.map((project, index) => (
        <div className="grid-item" key={index}>
          <h3>{project.title}</h3>
          <p>{project.genre}, {project.year}</p>
        </div>
      ))}
    </div>
  )

}
