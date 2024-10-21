import React, { useState } from "react";

const useLocalStorage = () => {
  const storeResults = (results) => {
    localStorage.setItem("petResults", JSON.stringify(results));
  };

  const retrieveResults = () => {
    return JSON.parse(localStorage.getItem("petResults"));
  };

  const deletePetResults = () => {};

  return { storeResults, retrieveResults, deletePetResults };
};

export default useLocalStorage;
