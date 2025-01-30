import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import client from '../sanityClient'
import './Lovelist.css'
import LovelistForm from '../component/LovelistForm'

export default function Lovelist() {
  const [lovelist, setLovelist] = useState(null)
  const [banned, setBanned] = useState(null)
  const [isReady, setIsReady] = useState(false)
  
  useEffect(() => {
    client
      .fetch('*[_type == "lovelist"]{verses, banned}')
      .then((data) => {
        setLovelist(data[0].verses)
        setBanned(data[0].banned)
      })
      .catch(console.error)

    requestAnimationFrame(() => setIsReady(true))
  }, [])

  async function addVerse(formData) {
    const newVerse = formData.get('verse')
    setLovelist([...lovelist, newVerse])
    
    const documentId = '62c8f92c-187a-441c-ba31-53ffaffff9df'
    client
      .patch(documentId)
      .append('verses', [newVerse])
      .commit()
      .then((updatedDocument) => {
        console.log('SANITY Updated document:', updatedDocument)
      })
      .catch((error) => {
        console.error('SANITY Error updating document:', error)
      })
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
          {lovelist && lovelist.map((verse, i) => <p key={i}>{verse}</p>)}
        </div>
        <LovelistForm addVerse={addVerse} banned={banned}/>
      </div>
    </>
  )
}
