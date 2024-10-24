import React, { useEffect, useState } from "react";
import { getData } from "../../../services/api";

const usePetResults = (id) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateResults = (storageResults) => {
    setResults(storageResults);
  };

  useEffect(() => {
    const getResults = async () => {
      const getResults = await getData(`/api/user/pets/${id}/results`);
      setIsLoading(true);
      if (getResults.status === "success") {
        setResults(getResults.data);
        setIsLoading(false);
      } else if (getResults.status === "failed") {
        console.log("fetch failed", getResults.error);
        setError(getResults.error);
        setIsLoading(false);
      }
    };
    getResults();
  }, []);
  return { results, isLoading, error, updateResults };
};

export default usePetResults;
