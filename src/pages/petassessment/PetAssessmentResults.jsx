import React, { useState, useEffect } from 'react'
import { getData, postData } from '../../api'
import { usePetAssessment } from '../../context/PetAssessmentContext'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const PetAssessmentResults = () => {
  const { petInfo } = usePetAssessment()
  const [results, setResults] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const getResults = async () => {
      // petInfo.symptoms is an array of symptoms object and the api expects symptoms to be an array of 
      // string not an array of object. 
      const symptoms_arr = petInfo.symptoms.map(symptom => symptom.name)
      const postResults = await postData('/api/results', { ...petInfo, symptoms: symptoms_arr })
      if (postResults) {
        setResults(postResults)
      }
    }
    getResults()
  }, [])
  console.log('results', results)
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" sx={{ fontWeight: 100 }}>Results</Typography>
      {results.map(({ name, description }) => {
        return <div style={{ textAlign: 'center' }}>
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
