import React, { useState, useEffect } from 'react'
import { getData } from '../../api'
import PetCard from './PetCard'

const Pets = () => {
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
  return pets.map(pet => <PetCard pet={pet} />)
}



export default Pets
