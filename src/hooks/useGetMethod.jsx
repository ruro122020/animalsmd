import { useState, useEffect } from "react";
import { getData } from "../services/api";

const useGetMethod = ({ url }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateData = (newData) => {
    setData(newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData(url);
      if (response.status === "success") {
        setData(response.data);
        setIsLoading(false);
      } else if (response.status === "failed") {
        console.log("response failed", response);
        setIsLoading(false);
        setError(response.error);
      }
    };
    fetchData();
  }, []);
  return { data, isLoading, error, updateData };
};

export default useGetMethod;
