import React, { useEffect, useState } from 'react'
import { getData } from '../../api'
import { useParams } from 'react-router-dom';
import Results from '../../components/results/Results';
/**
 * 
 * IF at any point Grid is implemented, take into consideration the Results component has a Grid container
 *  
 * 
 */
const MorePetInfo = () => {
  const [pet, setPet] = useState({})
  const [petResults, setPetResults] = useState({})
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true)
  const [petLoaded, setPetLoaded] = useState(false)
  const [petResultsLoaded, setPetResultsLoaded] = useState(false)

  //fetch for users pet by id that is passed
  //fetch for the pets results

  useEffect(() => {
    const getPetInfo = async () => {
      const petInfo = await getData(`/api/user/pets/${id}`)
      if (petInfo) {
        setPet(petInfo)
        setPetLoaded(true)
      } else {
        console.log('pet was not fetched')
      }
    }
    getPetInfo()
  }, [])


  //IMPORTANT NOTE: this useEffect is the last to make a fetch to the api,
  //therefore, it will set the isLoading state to false once all the other fetches are done,
  //If more fetches need to be made, MAKE SURE THE LAST useEffect that fetches data sets isLoading to false. 
  useEffect(() => {
    const getPetResults = async () => {
      const petResults = await getData(`/api/user/pets/${id}/results`)
      if (petResults) {
        setPetResults(petResults)
        setPetResultsLoaded(true)
      } else {
        console.log('pet results not fetched')
      }
    }
    getPetResults()
  }, [])


  useEffect(() => {
    console.log(petLoaded, petResultsLoaded)
    if (petLoaded && petResultsLoaded) {
      setIsLoading(false)
    }
  }, [petLoaded, petResultsLoaded])
  //STYLE OBJECTS
  const container = { padding: '15px' }
  const petBox = { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '15px' }
  const ageWeightDiv = { display: 'flex' }
  const age = { padding: '12px' }
  const weight = { padding: '12px' }
  const symptomsContainer = { display: 'flex', }
  const symptomBox = { paddingRight: '12px' }

  if (isLoading) return <p>loading..</p>
  return (
    <div style={container}>
      <div style={petBox}>
        <div style={{ fontSize: '25px' }}>{pet.name.toUpperCase()}</div>
        <div style={ageWeightDiv}>
          <div style={age}>Age: {pet.age}</div>
          <div style={weight}>Weight: {pet.weight}</div>
        </div>
        {/**SYMPTOMS 
         * MIGHT NEED TO USE GRID FOR THIS SECTION
        */}
        <div style={symptomsContainer}>
          {pet.symptoms.map(({ name }) => {
            return (
              <div key={name} style={symptomBox}><span className='material-symbols-outlined' style={{ fontSize: '12px', padding: '3px' }}>pets</span>{name}</div>
            )
          })}
        </div>
      </div>
      <Results results={petResults} direction='row' />
    </div>
  )
}

export default MorePetInfo
