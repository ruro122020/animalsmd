import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1 >Discover Your Pet's Diagnosis</h1>
      <h5>
        Your trusted resource for understanding and treating your pet’s health issues.
        Take our quick and easy assessment to uncover insights into your pet's behavior.
      </h5>
      <div >
        <button onClick={() => navigate('/signup')} >Get Started</button>
      </div>
    </div>
  )
}

export default Hero
