import React, { useState, useEffect } from "react";
import { deleteData, getData } from "../../../services/api";
import { usePetAssessment } from "../context/PetAssessmentContext";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Results from "../../../components/Results";

const PetAssessmentResults = () => {
  const { petInfo, setPetInfo } = usePetAssessment();
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useOutletContext();

  //FOR RESULTS TO STAY CONSITANT AFTER PAGE REFRESH RESULTS ARE STORED IN LOCAL STORAGE AFTER FETCH
  useEffect(() => {
    const petResults = localStorage.getItem("petResults");
    if (petResults) {
      setResults(JSON.parse(petResults));
    }
    const petlocalStorageInfo = localStorage.getItem("petInfo");
    if (petlocalStorageInfo) {
      setPetInfo(JSON.parse(petlocalStorageInfo));
    }
  }, []);

  useEffect(() => {
    const getResults = async () => {
      localStorage.setItem("petInfo", JSON.stringify(petInfo));
      const getResults = await getData(`/api/user/pets/${petInfo.id}/results`);

      if (getResults) {
        setResults(getResults);
        setIsLoading(false);
        localStorage.setItem("petResults", JSON.stringify(getResults));
      } else {
        setIsLoading(false);
      }
    };
    getResults();
  }, []);

  //this function serves to communicate to the api
  //this function was created to make it easier to delete petInfo in the database if the results yielded: "No Results Found"
  const deleteDBPetInfo = async () => {
    localStorage.removeItem("petResults");
    return await deleteData(`/api/user/pets/${petInfo.id}`);
  };
  /**PET INFO IS SAVED TO DATABASE IN FORM 2 WHICH IS RENDERED BEFORE PETASSESSMENTRESULTS COMPONENT IS.
   * THEREFORE WHEN USER CLICKS ON THE START OVER BUTTON, THE SAVED PET INFO NEEDS TO BE DELETED
   * SO THAT IT WON'T APPEAR IN USERS DASHBOARD
   */
  const handleDelete = async () => {
    const deletePetInfo = deleteDBPetInfo();
    if (deletePetInfo) {
      navigate("/pet-assessment");
    }
  };

  if (isLoading) return <p>loading</p>;

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
    deleteDBPetInfo();
    return (
      <div sx={{ textAlign: "center" }}>
        <h5 severity="error">No Results Found</h5>
        <button onClick={() => navigate("/pet-assessment")}>Start Over</button>
      </div>
    );
  }
};

export default PetAssessmentResults;
