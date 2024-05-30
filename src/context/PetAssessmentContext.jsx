import React, { createContext, useContext, useState } from 'react'

const PetAssessmentContext = createContext()


//custom hook
export const usePetAssessment = () => useContext(PetAssessmentContext)

export const PetAssessmentProvider = ({ children }) => {
  const [petInfo, setPetInfo] = useState({})

  const updatePetInfo = (obj) => setPetInfo(obj)

  return (
    <div>
      <PetAssessmentContext.Provider value={{ petInfo, updatePetInfo }}>
        {children}
      </PetAssessmentContext.Provider>
    </div>
  )
}