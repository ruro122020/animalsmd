import React from "react";
import PetCard from "./PetCard";
import useUserPets from "../hooks/useUserPets";
const Pets = ({ setShowEditForm, setPet, updatedPet }) => {
  const { pets, isLoading, handleDelete, handleEdit } = useUserPets(
    setShowEditForm,
    setPet,
    updatedPet
  );

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
