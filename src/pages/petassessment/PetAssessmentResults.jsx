import React, { useState, useEffect } from 'react'
import { getData } from '../../api'
const PetAssessmentResults = () => {
  const [results, setResults] = useState('')
  useEffect(() => {
    const getResults = async () => {
      const res = await getData('/')//server needs an api route for results.  
      if (res) {
        setResults(res)
      } else {
        console.log('uh oh somthing went wrong')
      }
    }
    getResults()
  }, [])
  console.log('results', results)
  return (
    <div>
      results
    </div>
  )
}

export default PetAssessmentResults
