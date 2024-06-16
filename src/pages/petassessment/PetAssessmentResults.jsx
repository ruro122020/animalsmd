import React, { useState, useEffect } from 'react'
import { getData, postData } from '../../api'
import { usePetAssessment } from '../../context/PetAssessmentContext'
import { Box, Button, Typography } from '@mui/material'

const PetAssessmentResults = () => {
  const { petInfo } = usePetAssessment()
  const [results, setResults] = useState([])

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
    <Box>
      <Typography variant="h5">Results</Typography>
      {results.map(({ name }) => <p>{name}</p>)}
      <Button>Save</Button>
      <Button>Start Over</Button>

    </Box>
  )
}

export default PetAssessmentResults
