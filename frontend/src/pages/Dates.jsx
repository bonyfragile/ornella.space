import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import client from '../sanityClient'
import BlockContent from '@sanity/block-content-to-react'
import './Dates.css'

export default function Dates() {
  const [dates,setDates] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    client.fetch('*[_type == "dates"]{information}')
    .then ((data) => setDates(data[0]))
    .catch(console.error)

    requestAnimationFrame(() => setIsReady(true))
  }, [])

  // if (!dates) return <p>Loading...</p>;
  
  return (
    <>
    <Helmet>
      <title>ORNELLA DATES</title>
      <meta name="description" content="Ornella Pacchioni CV and important dates of her artistic practice." />
      <meta name="keywords" content="Ornella, Pacchioni, website, French, author, screenwriter, director, CV, bio, biography, dates" />
    </Helmet>
    <div className={`dates container ${isReady ? 'mount' : 'unmount'}`}>
      <div className="dates content">
        <BlockContent blocks={dates?.information} projectId="f588b6e1" dataset="production" />
      </div>
    </div>
    </>
  )
}
