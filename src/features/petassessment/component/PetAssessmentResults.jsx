import React, { useState, useEffect } from "react";
import { deleteData, getData } from "../../../services/api";
import { usePetAssessment } from "../context/PetAssessmentContext";
import { useNavigate } from "react-router-dom";
import Results from "../../../components/Results";
import usePetResults from "../hooks/usePetResults";
import useDeletePet from "../hooks/useDeletePet";

const PetAssessmentResults = () => {
  const { petInfo, setPetInfo } = usePetAssessment();
  const navigate = useNavigate();
  const {
    results,
    isLoading,
    error: petResultsError,
  } = usePetResults(petInfo.id);
  const { deletePet, error: petDeleteError } = useDeletePet();
  //FOR RESULTS TO STAY CONSITANT AFTER PAGE REFRESH RESULTS ARE STORED IN LOCAL STORAGE AFTER FETCH
  // useEffect(() => {
  //   const petResults = localStorage.getItem("petResults");
  //   if (petResults) {
  //     setResults(JSON.parse(petResults));
  //   }
  //   const petlocalStorageInfo = localStorage.getItem("petInfo");
  //   if (petlocalStorageInfo) {
  //     setPetInfo(JSON.parse(petlocalStorageInfo));
  //   }
  // }, []);

  const handleDelete = async () => {
    const res = await deletePet(petInfo.id);
    if (res.status === "success") {
      navigate("/pet-assessment");
    }
  };

  if (isLoading) return <p>loading...</p>;

  if (results.length > 0) {
    return (
      <>
        <Results results={results} direction="column" />
        <div style={{ display: "flex" }}>
          <button onClick={handleDelete}>Start Over</button>
          <button onClick={() => navigate("/user/dashboard")}>Save</button>
        </div>
      </>
    );
  } else {
    // deleteDBPetInfo();
    return (
      <div sx={{ textAlign: "center" }}>
        <h5 severity="error">No Results Found</h5>
        <button onClick={() => navigate("/pet-assessment")}>Start Over</button>
      </div>
    );
  }
};

export default PetAssessmentResults;
