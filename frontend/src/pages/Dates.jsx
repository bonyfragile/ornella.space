import React, { useState, useEffect } from 'react'
import client from '../sanityClient'
import BlockContent from '@sanity/block-content-to-react'
import './Dates.css'

export default function Dates() {
  const [dates,setDates] = useState(null)

  useEffect(() => {
    client.fetch('*[_type == "dates"]{information}')
    .then ((data) => setDates(data[0]))
    .catch(console.error)
  }, [])

  if (!dates) return <p>Loading...</p>;
  
  return (
    <div className="dates-container">
      <div className="dates-content">
        <BlockContent blocks={dates.information} projectId="f588b6e1" dataset="production" />
      </div>
    </div>
  )
}
