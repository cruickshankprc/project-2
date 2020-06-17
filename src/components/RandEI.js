import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Artists = () => {

  const [artistsData, setArtistsData] = useState([])
  const [similarArtists, setSimilarArtists] = useState([])

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

  function displaySimilar(event) {

    const id = event.target.id

    fetch(event.target.value, { headers: { 'X-XAPP-Token': `${token}` } })
      .then(resp => resp.json())
      .then(data => {
        const newSimilarArtists = data._embedded.artists.map((similarArtist) => {
          return { ...similarArtist, originalArtistID: id }
        })
        setSimilarArtists(similarArtists.concat(newSimilarArtists))
        console.log(newSimilarArtists)
      })


  }

  console.log(artistsData)
  return <div>
    <h1> Racial and Ethic Identity</h1>
    {artistsData.map((artist, index) => {
      return <div key={index}>
        <h2>{artist.name}</h2>
        <img src={artist._links.thumbnail.href} alt={artist.name} />
        {similarArtists.map((similarArtist) => {
          if (similarArtist.originalArtistID === artist.id) {
            return <div>
              <div> {similarArtist.name} </div>
              <img src={similarArtist._links.thumbnail.href} alt={similarArtist.name} />
            </div>
          } else {
            return null
          }
        })}
        <button id={artist.id} value={artist._links.similar_artists.href} onClick={displaySimilar}>Similar Artists</button>

      </div>
    })}

    <div>
      {similarArtists.map((artist, index) => {
        return <div key={index}>
          <h2>{artist.name}</h2>
          <img src={artist._links.thumbnail.href} alt={artist.name} />
          {/* {artist.showSimilarArtist ? <SimilarArtists /> : null} */}
        </div>
      })}
    </div>
  </div>


}

const SimilarArtists = () => {

  return <div>
    hello world
  </div>


}

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI1ZWU4YzAxOGFiMWRiZDAwMGY0YmYyYjIiLCJleHAiOjE1OTI5MjgxMzYsImlhdCI6MTU5MjMyMzMzNiwiYXVkIjoiNWVlOGMwMThhYjFkYmQwMDBmNGJmMmIyIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjVlZThlZDA4NWU1OTNkMDAwZTMxZWI2YyJ9.CztdCV8RDhXO5JbxoSjRG-pxjTej6vnmYdvVrN9uTqI'

export default Artists