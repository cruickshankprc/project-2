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


export default App


