import React, { useState, useEffect } from 'react'
import { getData } from '../../api'
import PetCard from './PetCard'

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

  //update pets array with updatedPet object if pet exist
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
  return pets.map(pet => <PetCard pet={pet} onDelete={handleDelete} onEdit={handleEdit} />)
}



export default Pets
