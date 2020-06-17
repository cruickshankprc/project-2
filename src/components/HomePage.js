import React, { useState, useEffect } from 'react'

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI1ZWU4YzAxOGFiMWRiZDAwMGY0YmYyYjIiLCJleHAiOjE1OTI5MjgxMzYsImlhdCI6MTU5MjMyMzMzNiwiYXVkIjoiNWVlOGMwMThhYjFkYmQwMDBmNGJmMmIyIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjVlZThlZDA4NWU1OTNkMDAwZTMxZWI2YyJ9.CztdCV8RDhXO5JbxoSjRG-pxjTej6vnmYdvVrN9uTqI'

const HomePage = () => {
  const [henryTaylor, setHenry] = useState({})
  useEffect(() => {
    fetch('https://api.artsy.net/api/artists/henry-taylor', { headers: { 'X-XAPP-Token': `${token}` } })
      .then(resp => resp.json())
      .then(data => {
        setHenry(data._links)
        // console.log(data)
      })
  }, [])

  // console.log(henryTaylor)

  return <h1> Hello </h1>
}


export default HomePage