import React from 'react'
import Traveler from './Traveler'

const TravelerList = ({ travelers }) => {
  return (
    <ul>
      {
        travelers.map(e => {
          return <Traveler traveler={e}/>
        })
      }
    </ul>
  )
}

export default TravelerList

