import React, { useEffect, useState } from "react";
import { getData } from "../../../services/api";

const usePetResults = (id) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getResults = async () => {
      const getResults = await getData(`/api/user/pets/${id}/results`);
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
  return { results, isLoading, error };
};

export default usePetResults;
