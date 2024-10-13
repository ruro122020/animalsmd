import React, { useState, useEffect, useCallback } from "react";
import useGetMethod from "../../../../components/useGetMethod";

const URL = "/api/user/pets";

const useUserPets = (setShowEditForm, setPet, updatedPet) => {
  const {
    data: pets,
    isLoading,
    error,
    updateData,
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
      updateData(newPetsList);
    }
  }, [updatedPet]);

  const handleDelete = (petToDelete) => {
    const clonePets = [...pets];
    const newListOfPets = clonePets.filter((pet) => pet.id !== petToDelete.id);
    updateData(newListOfPets);
  };

  const handleEdit = (petToEdit) => {
    setShowEditForm(true);
    setPet(petToEdit);
  };

  return { pets, isLoading, handleDelete, handleEdit };
};

export default useUserPets;
