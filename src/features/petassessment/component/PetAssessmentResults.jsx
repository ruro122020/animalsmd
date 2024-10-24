import React, { useEffect, useCallback } from "react";
import { usePetAssessment } from "../context/PetAssessmentContext";
import { useNavigate } from "react-router-dom";
import Results from "../../../components/Results";
import usePetResults from "../hooks/usePetResults";
import { useBeforeUnload } from "react-router-dom";

const PetAssessmentResults = () => {
  const { petInfo, setPetInfo } = usePetAssessment();
  const navigate = useNavigate();
  const { results, isLoading, error, updateResults } = usePetResults(
    petInfo.id
  );

  // save it off before users navigate away
  useBeforeUnload(
    useCallback(() => {
      localStorage.petResults = JSON.stringify(results);
    }, [results])
  );

  // read it in when they return
  useEffect(() => {
    if (results.length === 0 && localStorage.petResults != []) {
      updateResults(JSON.parse(localStorage.petResults));
    }
  }, [results]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Results results={results} direction="column" />
      <div style={{ display: "flex" }}>
        <button onClick={() => navigate("/pet-assessment")}>Start Over</button>
      </div>
    </>
  );
};

export default PetAssessmentResults;
