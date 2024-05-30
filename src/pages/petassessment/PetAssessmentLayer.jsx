import React from 'react'
import { PetAssessmentProvider } from '../../context/PetAssessmentContext'
import PetAssessment from './PetAssessment'
import { Outlet } from 'react-router-dom'

const PetAssessmentLayer = () => {
  return (
    <div>
      <PetAssessmentProvider>
        <PetAssessment />
        <Outlet />
      </PetAssessmentProvider>
    </div>
  )
}

export default PetAssessmentLayer
