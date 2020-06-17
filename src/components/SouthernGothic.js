import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const SouthernGothic = () => {

  const [artistsData, setArtistsData] = useState([])
  const [similarArtists, setSimilarArtists] = useState([])
  const [key, setKey] = useState('')

  useEffect(() => {
    fetch('https://api.artsy.net/api/artists?gene_id=5266f6c2275b2414e300025b', { headers: { 'X-XAPP-Token': `${token}` } })
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

  return <div className="randeipage">
    <h1 className="RANDE"> Southern Gothic </h1>
    <p>"Southern Gothic—a term taken from an established tradition in American Literature—is a category for artworks that feature themes and images drawn from the dark corners of the American South. From the grotesque masked figures present in Ralph Eugene Meatyard’s black-and-white photographs to the antebellum ruins of photographer Sally Mann's images, such works might evoke folklore, oral history, local communities, concepts of the abnormal, and plantation life."</p>
    {/* <div id="typedtext" value={typewriter}></div> */}
    {artistsData.map((artist, index) => {
      return <div key={index}>
        <div className="sGCard">
          <h2 className="sgArtistsName">{artist.name.toUpperCase()}</h2>
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

        <button className="button-3" key={index} id={artist.id} value={artist._links.similar_artists.href} onClick={() => displaySimilar(event, index)}>Similar Artists</button>

      </div>
    })}
  </div>
}





const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI1ZWU4YzAxOGFiMWRiZDAwMGY0YmYyYjIiLCJleHAiOjE1OTI5MjgxMzYsImlhdCI6MTU5MjMyMzMzNiwiYXVkIjoiNWVlOGMwMThhYjFkYmQwMDBmNGJmMmIyIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjVlZThlZDA4NWU1OTNkMDAwZTMxZWI2YyJ9.CztdCV8RDhXO5JbxoSjRG-pxjTej6vnmYdvVrN9uTqI'

export default SouthernGothic