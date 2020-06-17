import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Carousel, { Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'



const Artists = () => {

  const [artistsData, setArtistsData] = useState([])
  const [similarArtists, setSimilarArtists] = useState([])
  const [key, setKey] = useState('')

  useEffect(() => {
    fetch('https://api.artsy.net/api/artists?cursor=100%3A5ee9c1c34ed9d50007d748b9&gene_id=4de93fa9c182420001004327', { headers: { 'X-XAPP-Token': `${token}` } })
      .then(resp => resp.json())
      .then(data => {
        const newData = data._embedded.artists.map((artist) => {
          return { ...artist, showSimilarArtist: false }

        })

        setArtistsData(newData)

      })
  }, [])

  function displaySimilar(event, buttonKey) {
    if (buttonKey === key) {
      setSimilarArtists([])
    } else {


      const id = event.target.id

      fetch(event.target.value, { headers: { 'X-XAPP-Token': `${token}` } })
        .then(resp => resp.json())
        .then(data => {

          const newSimilarArtists = data._embedded.artists.map((similarArtist) => {
            return { ...similarArtist, originalArtistID: id }

          })

          const test = similarArtists.concat(newSimilarArtists)
          const result = []
          const seen = {}
          test.forEach((artist) => {
            if (!seen.hasOwnProperty(artist.id)) {
              result.push(artist)
              seen[artist.id] = true
            }
          })
          setKey(buttonKey)
          setSimilarArtists(result)

        })
    }
  }
  console.log(similarArtists)


  // console.log(artistsData)

  return <>
   <h1 className="RANDE"> RACIAL AND ETHNIC IDENTITY</h1>
  <div className="randeipage">
    {/* <h1 className="RANDE"> RACIAL AND ETHNIC IDENTITY</h1> */}
    {artistsData.map((artist, index) => {
      return <div key={index}>
        <div className="artistCard">
          <h2 className="artistsName">{artist.name.toUpperCase()}</h2>
          <img src={artist._links.thumbnail.href} alt={artist.name} />

        </div>

        {/* <Carousel
          clickToChange
          slidesPerPage={4}
          centered> */}
        <div className="similarArtistContainer">
          {similarArtists.map((similarArtist) => {
            if (similarArtist.originalArtistID === artist.id) {
              return <div className="similarArtistCard">
                <div> {similarArtist.name.toUpperCase()} </div>
                <img src={similarArtist._links.thumbnail.href} alt={similarArtist.name} />
              </div>

            } else {
              return null
            }
          })}

        </div>
        {/* </Carousel> */}

        <button className="button-2" key={index} id={artist.id} value={artist._links.similar_artists.href} onClick={() => displaySimilar(event, index)}>Similar Artists</button>

      </div>
    })}
  </div>
  </>





}



const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI1ZWU4YzAxOGFiMWRiZDAwMGY0YmYyYjIiLCJleHAiOjE1OTI5MjgxMzYsImlhdCI6MTU5MjMyMzMzNiwiYXVkIjoiNWVlOGMwMThhYjFkYmQwMDBmNGJmMmIyIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjVlZThlZDA4NWU1OTNkMDAwZTMxZWI2YyJ9.CztdCV8RDhXO5JbxoSjRG-pxjTej6vnmYdvVrN9uTqI'

export default Artists