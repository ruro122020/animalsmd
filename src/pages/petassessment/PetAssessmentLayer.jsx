import React, { useRef, useState } from 'react'
import { PetAssessmentProvider } from '../../context/PetAssessmentContext'
import { Outlet } from 'react-router-dom'
import background from '../../assets/pet-assessment-media/pet-assessment-bg.jpg'


const PetAssessmentLayer = () => {
  const [isLoading, setIsLoading] = useState(null)
  return (
    <PetAssessmentProvider>
      <div>
        <div>
          <h1>Pet Assessment</h1>
          <Outlet
            context={[isLoading, setIsLoading]}
          />
        </div>
      </div >
    </PetAssessmentProvider>
  )
}

export default PetAssessmentLayer
