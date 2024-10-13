import React, { useState, useEffect } from "react";
import { getData } from "../services/api";

const useGetMethod = ({ url }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getData(url);
      if (response.status === "success") {
        setData(response.data);
        setIsLoading(false);
      } else if (response.status === "failed") {
        console.log("response failed", response);
      }
    };
    fetchData();
  }, []);
  return { data, isLoading, setData };
};

export default useGetMethod;
