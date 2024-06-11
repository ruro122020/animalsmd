import React, { useState, useEffect } from 'react'
import { getData } from '../../api'
import PetCard from './PetCard'
import Grid from '@mui/material/Grid'

const Pets = () => {
  const [pets, setPets] = useState([])

  useEffect(() => {
    const getPets = async () => {
      const fetchedPets = await getData('/api/users/pets')
      if (fetchedPets) {
        setPets(fetchedPets)
      }
    }
    getPets()
  }, [])
  return pets.map(pet => {
    return <Grid item xs={5} sx={{ border: '2px solid green' }}>
      <PetCard pet={pet} />
    </Grid>
  })
}



export default Pets
