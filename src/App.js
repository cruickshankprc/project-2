import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './styles/style.scss'

import HomePage from './components/HomePage'
import RandEI from './components/RandEI'

// https://api.artsy.net/api/artworks?gene_id=4de93fa9c182420001004327
// https://api.artsy.net/api/artists?similar_to_artist_id=59dcf2759c18db760d8f3947

// * Henry Taylor:
// https://api.artsy.net/api/artists/henry-taylor

//const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI1ZWU4YzAxOGFiMWRiZDAwMGY0YmYyYjIiLCJleHAiOjE1OTI5MjgxMzYsImlhdCI6MTU5MjMyMzMzNiwiYXVkIjoiNWVlOGMwMThhYjFkYmQwMDBmNGJmMmIyIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjVlZThlZDA4NWU1OTNkMDAwZTMxZWI2YyJ9.CztdCV8RDhXO5JbxoSjRG-pxjTej6vnmYdvVrN9uTqI'

const App = () => {

  return <HashRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/randei" component={RandEI} />
    </Switch>
  </HashRouter>
}

//   const [artistsData, setArtistsData] = useState([])

//   useEffect(() => {
//     fetch('https://api.artsy.net/api/artists?cursor=100%3A5ee9c1c34ed9d50007d748b9&gene_id=4de93fa9c182420001004327', { headers: { 'X-XAPP-Token': `${token}` } })
//       .then(resp => resp.json())
//       .then(data => {
//         setArtistsData(data._embedded.artists)
//         // console.log(data)
//       })
//   }, [])

//   // const myArray = artistsData._embeddedartists


//   console.log(artistsData)
//   return <div>
//     {artistsData.map((artist, index) => {
//       return <div key={index}>
//         <h1>{artist.name}</h1>
//         <img src={artist._links.thumbnail.href} alt={artist.name} />
//       </div>
//     })}
//   </div>

// return <HashRouter>
// <Switch>
//   <Route exact path="/" component={HomePage} />
//   <Route exact path="/RandEI" component={RandEI} />
// </Switch>
// </HashRouter>




// const HomePage = () => {
//   const [henryTaylor, setHenry] = useState([])
//   useEffect(() => {
//     fetch('https://api.artsy.net/api/artists/henry-taylor', { headers: { 'X-XAPP-Token': `${token}` } })
//       .then(resp => resp.json())
//       .then(data => {
//         setHenry(data)
//         // console.log(data)
//       })
//   }, [])

// }



export default App


