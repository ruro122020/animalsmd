import React, { useState, useEffect, useRef } from 'react'
import { deleteData, getData, postData } from '../../api'
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
      const postResults = await postData('/api/user/results', { ...petInfo, symptoms: symptoms_arr })
      if (postResults) {
        setResults(postResults)
        setIsLoading(false)
      }
    }
    getResults()
  }, [])

  /**PET INFO IS SAVED TO DATABASE IN FORM 2 WHICH IS RENDERED BEFORE PETASSESSMENTRESULTS COMPONENT IS. 
   * THEREFORE WHEN USER CLICKS ON THE START OVER BUTTON, THE SAVED PET INFO NEEDS TO BE DELETED
   * SO THAT IT WON'T APPEAR IN USERS DASHBOARD
   */
  const handleDelete = async () => {
    const deletePetInfo = await deleteData(`/api/user/pets/${petInfo.id}`)
    if (deletePetInfo) {
      navigate('/pet-assessment')
    }
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <Box ref={form} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" sx={{ fontSize: '20px' }}>Results</Typography>
      {results.map(({ name, description }) => {
        return <div style={{ textAlign: 'center' }} key={name}>
          <p>{name.toUpperCase()}</p>
          <p>{description}</p>
        </div>
      })}
      <div style={{ display: 'flex' }}>
        <Button onClick={handleDelete}>Start Over</Button>
        <Button onClick={() => navigate('/user/dashboard')}>Save</Button>
      </div>
    </Box>
  )
}

export default PetAssessmentResults
