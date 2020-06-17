import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const MigrationArtists = () => {

  const [artistsData, setArtistsData] = useState([])
  const [similarArtists, setSimilarArtists] = useState([])
  const [key, setKey] = useState('')

  useEffect(() => {
    fetch('https://api.artsy.net/api/artists?gene_id=5266f899cd530eb849000222', { headers: { 'X-XAPP-Token': `${token}` } })
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
    <h1 className="RANDE"> MIGRATION</h1>
    {/* <div id="typedtext" value={typewriter}></div> */}
    {artistsData.map((artist, index) => {
      return <div key={index}>
        <div className="migrationACard">
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
}

// var aText = new Array(
//   'There are only 10 types of people in the world:',
//   'Those who understand binary, and those who dont'
// )
// var iSpeed = 100 // time delay of print out
// var iIndex = 0// start printing array at this posision
// var iArrLength = aText[0].length // the length of the text array
// var iScrollAt = 20 // start scrolling up at this many lines

// var iTextPos = 0 // initialise text position
// var sContents = ''// initialise contents variable
// var iRow // initialise current row

// function typewriter() {
//   sContents = ' '
//   iRow = Math.max(0, iIndex - iScrollAt)
//   const destination = document.getElementsByClassName('typedtext')

//   while (iRow < iIndex) {
//     sContents += aText[iRow++] + '<br />'
//   }
//   destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + '_'
//   if (iTextPos++ === iArrLength) {
//     iTextPos = 0
//     iIndex++
//     if (iIndex !== aText.length) {
//       iArrLength = aText[iIndex].length
//       setTimeout('typewriter()', 500)
//     }
//   } else {
//     setTimeout('typewriter()', iSpeed)
//   }
// }
// typewriter()



const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI1ZWU4YzAxOGFiMWRiZDAwMGY0YmYyYjIiLCJleHAiOjE1OTI5MjgxMzYsImlhdCI6MTU5MjMyMzMzNiwiYXVkIjoiNWVlOGMwMThhYjFkYmQwMDBmNGJmMmIyIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjVlZThlZDA4NWU1OTNkMDAwZTMxZWI2YyJ9.CztdCV8RDhXO5JbxoSjRG-pxjTej6vnmYdvVrN9uTqI'

export default MigrationArtists