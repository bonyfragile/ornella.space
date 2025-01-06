import React, { useState, useEffect } from 'react'
import client from '../sanityClient'
import { urlFor} from '../imageUrl'
import './Homepage.css'

export default function Homepage() {
  const [projects, setProjects] = useState([])

  useEffect (() => {
    client.fetch('*[_type in ["film", "book", "postpunkpoetry"]]|order(_createdAt desc){title, genre, year, "coverImage": coverImage.asset->url}')
    .then ((data) => setProjects(data))
  }, [])

  console.log(projects)

  const imageUrl = projects.coverImage ? urlFor(projects.coverImage).url() : null;


  return (
    <div className="container">
      <div className="grid">
        {projects.map((project, index) => (
          <div className="grid-item" key={index}>
            <div className="text">
              <div className="title">{project.title}</div>
              <div className="subtitle">{project.genre}, {project.year}</div>
            </div>
            <img src={project.coverImage} alt={project.title} className="image" />
          </div>
        ))}
      </div>
    </div>
  )

}
