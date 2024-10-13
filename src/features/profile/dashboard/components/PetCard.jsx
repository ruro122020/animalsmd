import React from "react";
import { deleteData } from "../../../../services/api";
import { useNavigate } from "react-router-dom";
/**
 * NOTE: The editing of pet is being handled in Pets component
 */

export default function PetCard({ pet, onDelete, onEdit }) {
  const { age, name, symptoms, weight, id } = pet;
  const navigate = useNavigate();

  const handleDelete = async () => {
    //Delete pet from database
    const deletePet = await deleteData(`/api/user/pets/${id}`);
    if (deletePet) {
      //delete pet from pets array
      onDelete(pet);
    } else {
      console.log("oops something went wrong with handleDelete");
    }
  };

  const handleMorePetInfo = () => {
    navigate(`/user/dashboard/pets/${id}/results`);
  };
  const renderSymptoms = symptoms.map(({ name }) => (
    <div key={name}>
      <p>{name}</p>
    </div>
  ));

  return (
    <div>
      <div onClick={handleMorePetInfo} style={{ cursor: "pointer" }}>
        <h3>{name.toUpperCase()}</h3>
        <div>
          <h5 sx={{ paddingBottom: "12px" }}>SYMPTOMS</h5>
          {renderSymptoms}
        </div>
      </div>
      <div>
        <div className="holding main content">
          <div>
            <h6 level="body-xs">Age</h6>
            <p fontSize="lg" fontWeight="lg">
              {age}
            </p>
          </div>
          <div>
            <h6 level="body-xs">Weight</h6>
            <p fontSize="lg" fontWeight="lg">
              {weight}
            </p>
          </div>
        </div>
        <div
          style={{
            paddingTop: "12px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <button onClick={() => onEdit(pet)}>Edit</button>
          </div>
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
