import React, { useState, useEffect, useRef } from 'react'
import { deleteData, getData, postData } from '../../api'
import { usePetAssessment } from '../../context/PetAssessmentContext'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

const PetAssessmentResults = () => {
  const { petInfo } = usePetAssessment()
  const [results, setResults] = useState([])
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useOutletContext()


  useEffect(() => {
    //FOR RESULTS TO STAY CONSITANT AFTER PAGE REFRESH STORE RESULTS IN LOCAL STORAGE
    const getResults = async () => {
      const getResults = await getData(`/api/user/pets/${petInfo.id}/results`)
      if (getResults) {
        setResults(getResults)
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
  const displayResults = results.map(({ name, description, id, medications, remedy, symptoms }) => {
    return (
      <div key={id}>
        <div>
          <div>Results</div>
          <div>{name}</div>
          <div>{description}</div>
        </div>
        <div>
          <div>Remedies</div>
          <div>{remedy}</div>
        </div>
        <div>
          <div>Medications</div>
          {medications.map(({ name, description, id }) => {
            return (
              <div key={id}>
                <div>{name}</div>
                <div>{description}</div>
              </div>
            )
          })}
        </div>
        <div>
          <div>Products</div>
        </div>
      </div>
    )
  })
  if (isLoading) return <p>loading</p>
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {displayResults}
      <div style={{ display: 'flex' }}>
        <Button onClick={handleDelete}>Start Over</Button>
        <Button onClick={() => navigate('/user/dashboard')}>Save</Button>
      </div>
    </Box>
  )
}

export default PetAssessmentResults
