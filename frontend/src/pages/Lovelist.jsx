import React, { useState, useEffect } from 'react'
import client from '../sanityClient'
import BlockContent from '@sanity/block-content-to-react'
import './Lovelist.css'

export default function Lovelist() {
  const [lovelist, setLovelist] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    client.fetch('*[_type == "lovelist"]{text}')
    .then((data) => setLovelist(data[0]))
    .catch(console.error)

    requestAnimationFrame(() => setIsReady(true))
  }, [])

  // if (!lovelist) return <p>Loading...</p>;
  return (
    <div className={`lovelist container ${isReady ? 'mount' : 'unmount'}`}>
      <div className="lovelist-content">
        <BlockContent blocks={lovelist?.text} projectId="f588b6e1" dataset="production" />
      </div>
    </div>
  )
}
