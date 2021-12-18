import React from 'react'

const Traveler = ({ traveler }) => {
  return (
    <div className='traveler-container'>
      <ul>
        <li>{traveler.name}</li>
        <li>{traveler.age}</li>
        <li>{traveler._id}</li>
      </ul>
    </div>
  )
}

export default Traveler
