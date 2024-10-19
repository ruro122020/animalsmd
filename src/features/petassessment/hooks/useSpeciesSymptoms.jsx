import React, { useState, useEffect } from "react";
import { getData } from "../../../services/api";
import { useOutletContext } from "react-router-dom";

const useSpeciesSymptoms = (speciesType) => {
  const [symptoms, setSymptoms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getSymptoms = async () => {
      const symptomsData = await getData(`/api/species/${speciesType}`);
      if (symptomsData.status === "success") {
        setSymptoms(symptomsData.data.symptoms);
        setIsLoading(false);
      } else if (symptomsData.status === "failed") {
        console.log("fetched failed", symptomsData);
        setError(symptomsData.error);
      }
    };
    getSymptoms();
  }, []);
  return { symptoms, isLoading, error };
};

export default useSpeciesSymptoms;
