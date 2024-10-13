import React, { useState, useEffect } from "react";
import { getData } from "../../../../services/api";
import PetCard from "./PetCard";
import useGetMethod from "../../../../components/useGetMethod";

const Pets = ({ setShowEditForm, setPet, updatedPet }) => {
  const URL = "/api/user/pets";
  const {
    data: pets,
    setData: setPets,
    isLoading,
  } = useGetMethod({ url: URL });

  //update pets array with updatedPet object if updatedPet exist
  useEffect(() => {
    if (updatedPet) {
      const clonePets = [...pets];
      const newPetsList = clonePets.map((pet) => {
        if (pet.id === updatedPet.id) {
          return updatedPet;
        } else {
          return pet;
        }
      });
      setPets(newPetsList);
    }
  }, [updatedPet]);

  const handleDelete = (petToDelete) => {
    const clonePets = [...pets];
    const newListOfPets = clonePets.filter((pet) => pet.id !== petToDelete.id);
    setPets(newListOfPets);
  };

  const handleEdit = (petToEdit) => {
    setShowEditForm(true);
    setPet(petToEdit);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {pets.map((pet) => (
        <div key={pet.id}>
          <PetCard pet={pet} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      ))}
    </div>
  );
};

export default Pets;
