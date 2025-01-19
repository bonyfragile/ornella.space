import React, { useState, useEffect } from 'react'
import client from '../sanityClient'
import { urlFor} from '../imageUrl'
import BlockContent from '@sanity/block-content-to-react'
import './Bio.css'

export default function Bio() {
  const [bio, setBio] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    client.fetch('*[_type == "bio"]{description, photo}')
    .then((data) => setBio(data[0]))
    .catch(console.error)
    requestAnimationFrame(() => setIsReady(true))
  }, [])

  // if (!bio) return <p>Loading...</p>;

  const imageUrl = bio?.photo ? urlFor(bio.photo).width(600).url() : null;
  console.log(bio?.photo, imageUrl);
  
  return (
    <div className={`bio container ${isReady ? 'mount' : 'unmount'}`}>
      <div className="bio-content">
        {imageUrl && (<img src={imageUrl} alt="Ornella Portrait" className="bio-photo" />)}
        <BlockContent blocks={bio?.description} projectId="f588b6e1" dataset="production" />     
      </div>
    </div>
  )
}
