import React, { useState, useEffect, useRef } from 'react'
import { getData, postData } from '../../api'
import { usePetAssessment } from '../../context/PetAssessmentContext'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'

const PetAssessmentResults = () => {
  const { petInfo } = usePetAssessment()
  const [results, setResults] = useState([])
  const navigate = useNavigate()
  const form = useRef()
  const [isLoading, setIsLoading] = useState(true)

  //animation for this page is in useGSAP
  //refer to gsap docs for more info on dependencies https://gsap.com/resources/React/
  useGSAP(() => {
    if (form && form.current && !isLoading) {
      gsap.from(form.current, {
        duration: 1,
        opacity: 0,
        y: -40,
        stagger: 0.1,
        ease: "back.in"
      })
    }
  }, { dependencies: [form, isLoading] }) //these dependencies are needed for when form and isLoading state changes

  useEffect(() => {
    const getResults = async () => {
      // petInfo.symptoms is an array of symptoms object and the api expects symptoms to be an array of 
      // string not an array of object. 
      const symptoms_arr = petInfo.symptoms.map(symptom => symptom.name)
      const postResults = await postData('/api/results', { ...petInfo, symptoms: symptoms_arr })
      if (postResults) {
        setResults(postResults)
        setIsLoading(false)
      }
    }
    getResults()
  }, [])


  if (isLoading) return <p>Loading...</p>

  /**on the "start over" button make sure to delete the pet from pets database
   * To be sure it appear in dashboard
   */
  return (
    <Box ref={form} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" sx={{ fontWeight: 100 }}>Results</Typography>
      {results.map(({ name, description }) => {
        return <div style={{ textAlign: 'center' }} key={name}>
          <p>{name.toUpperCase()}</p>
          <p>{description}</p>
        </div>
      })}
      <div style={{ display: 'flex' }}>
        <Button onClick={() => navigate('/pet-assessment')}>Start Over</Button>
        <Button onClick={() => navigate('/user/dashboard')}>Save</Button>
      </div>
    </Box>
  )
}

export default PetAssessmentResults
