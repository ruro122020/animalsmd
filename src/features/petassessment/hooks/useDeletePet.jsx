import React, { useState } from "react";
import { deleteData } from "../../../services/api";

const useDeletePet = () => {
  const [error, setError] = useState(null);

  const deletePet = async (id) => {
    const response = await deleteData(`/api/user/pets/${id}`);
    if (response.status === "success") {
      return response;
    } else if (response.status === "failed") {
      console.log(response.error);
      setError(response.error);
    }
  };

  return { deletePet, error };
};

export default useDeletePet;
