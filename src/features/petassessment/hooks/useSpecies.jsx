import React, { useState, useEffect } from "react";
import { getData } from "../../../services/api";

const capitalizeFirstLetterWord = (arr) => {
  return arr.map((obj) => {
    //capitalize the first letter of each species name
    const splitTypeName = obj.type_name.split(" ");
    const reformatWord = splitTypeName.map((word) => {
      const capLetter = word.slice(0, 1).toUpperCase();
      const restOfWord = word.slice(1);
      return capLetter + restOfWord;
    });
    //return the species name with first letter being capitalized
    return reformatWord.join(" ");
  });
};

const useSpecies = () => {
  const [species, setSpecies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //Fetches species list
  useEffect(() => {
    const getSpecies = async () => {
      const species = await getData("/api/species");
      if (species.status === "success") {
        const speciesList = capitalizeFirstLetterWord(species.data);
        setSpecies(speciesList);
        setIsLoading(false);
      } else if (species.status === "failed") {
        setIsLoading(false);
        setError(species.error);
      }
    };
    getSpecies();
  }, []);

  return { species, isLoading, error };
};

export default useSpecies;
