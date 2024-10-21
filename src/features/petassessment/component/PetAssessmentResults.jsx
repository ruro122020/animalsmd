import React, { useEffect } from "react";
import { deleteData } from "../../../services/api";
import { usePetAssessment } from "../context/PetAssessmentContext";
import { useNavigate } from "react-router-dom";
import Results from "../../../components/Results";
import usePetResults from "../hooks/usePetResults";
import useLocalStorage from "../hooks/useLocalStorage";

//Approach:
/**
 * inital render of component will have results defined and displayed
 *
 * We will need to call the useLocalStorage hook
 *  -- create function to call in this component that will store the results in localstorage
 *     when the component is first mounted
 *
 * On refresh, all state are resetted
 * this means that state:
 * "results" will be an empty array
 * "isLoading" will be true
 * "error" will be false
 *
 * what we want after page refreshes:
 * --create a function to retrieve the results from the localstorage
 *    -- this function will be called in a useEffect
 *
 * When user navigates to another component/page
 * --delete the petResults from localstorage
 *
 */

const PetAssessmentResults = () => {
  const { petInfo, setPetInfo } = usePetAssessment();
  const navigate = useNavigate();
  const { results, isLoading, error, updateResults } = usePetResults(
    petInfo.id
  );
  const { storeResults, retrieveResults, deletePetResults } = useLocalStorage();

  useEffect(() => {
    storeResults(results);
  }, []);

  useEffect(() => {
    const storageResults = retrieveResults();
    if (storageResults) {
      updateResults(storageResults);
    }
  }, []);

  const handleDelete = async () => {
    await deleteData(`/api/user/pets/${petInfo.id}`);
    navigate("/pet-assessment");
  };

  if (isLoading) return <p>Loading...</p>;

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
