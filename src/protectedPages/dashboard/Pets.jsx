import React, { useState, useEffect } from 'react'
import { getData } from '../../api'
import PetCard from './PetCard'
import { Grid } from '@mui/material'
const Pets = ({ setShowEditForm, setPet, updatedPet }) => {
  const [pets, setPets] = useState([])
  useEffect(() => {
    const getPets = async () => {
      const fetchedPets = await getData('/api/user/pets')
      if (fetchedPets) {
        setPets(fetchedPets)
      }
    }
    getPets()
  }, [])

  //update pets array with updatedPet object if updatedPet exist
  useEffect(() => {
    if (updatedPet) {
      const clonePets = [...pets]
      const newPetsList = clonePets.map(pet => {
        if (pet.id === updatedPet.id) {
          return updatedPet
        } else {
          return pet
        }
      })
      setPets(newPetsList)
    }
  }, [updatedPet])

  const handleDelete = (petToDelete) => {
    const clonePets = [...pets]
    const newListOfPets = clonePets.filter(pet => pet.id !== petToDelete.id)
    setPets(newListOfPets)
  }

  const handleEdit = (petToEdit) => {
    setShowEditForm(true)
    setPet(petToEdit)
  }
  return (
    <Grid container spacing={2} sx={{ p: 2, marginLeft: 0, marginTop: 0, display: 'flex' }}>
      {pets.map(pet => (
        <Grid item key={pet.id} sx={{ display: 'flex' }} >
          <PetCard pet={pet} onDelete={handleDelete} onEdit={handleEdit} />
        </Grid>
      ))}
    </Grid>
  )
}



export default Pets
