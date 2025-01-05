import React, { useState, useEffect } from 'react'
import client from '../sanityClient'
import { urlFor} from '../imageUrl'
import './Bio.css'

export default function Bio() {
  const [bio, setBio] = useState(null)

  useEffect(() => {
    client.fetch('*[_type == "bio"]{description, photo}')
    .then((data) => setBio(data[0]))
    .catch(console.error)
  }, [])

  if (!bio) return <p>Loading...</p>;

  const imageUrl = bio.photo ? urlFor(bio.photo).width(600).url() : null;

  return (
    <div className="bio-container">
      <div className="bio-content">
        <p className="bio-description">{bio.description}</p>     
        {imageUrl && (<img src={imageUrl} alt="Ornella Portrait" className="bio-photo" />)}
      </div>
    </div>
  )
}
