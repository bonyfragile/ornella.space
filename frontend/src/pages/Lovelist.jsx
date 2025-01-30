import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import client from '../sanityClient'
import BlockContent from '@sanity/block-content-to-react'
import './Lovelist.css'
import LovelistForm from '../component/LovelistForm'

export default function Lovelist() {
  const [lovelist, setLovelist] = useState(null)
  const [isReady, setIsReady] = useState(false)

  console.log(client)
  
  useEffect(() => {
    client.fetch('*[_type == "lovelist"]{text}')
    .then((data) => {
      console.log("initial lovelist", data[0])
      setLovelist(data[0])
    })
    .catch(console.error)

    requestAnimationFrame(() => setIsReady(true))
  }, [])

  async function addVerse(formData) {
    
    // setLovelist([...lovelist])
    // console.log("addVerse() called", formData);
    
    // await client.create({
    //   _type: "lovelistForm",
    //   verse: verse,
    // })
  }

  // if (!lovelist) return <p>Loading...</p>;
  return (
    <>
    <Helmet>
      <title>ORNELLA LOVELIST</title>
      <meta name="description" content="Ornella Pacchioni lovelist" />
      <meta name="keywords" content="Ornella, Pacchioni, French, author, screenwriter, director, lovelist" />
    </Helmet>
    <div className={`lovelist container ${isReady ? 'mount' : 'unmount'}`}>
      <div className="lovelist-content">
        <BlockContent blocks={lovelist?.text} projectId="f588b6e1" dataset="production" />
      </div>
      <LovelistForm addVerse={addVerse}/>
    </div>
    </>
  )
}
