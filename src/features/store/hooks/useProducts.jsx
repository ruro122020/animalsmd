import React, { useState, useEffect } from "react";
import { getData } from "../../../services/api";

const useProducts = () => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const productsArr = await getData("/api/products");
      if (!productsArr.error) {
        setProducts(productsArr);
        setIsLoading(false);
      } else {
        //if there is an error, the getData function returns a message
        console.log("productArr in else", productsArr);
        setIsLoading(false);
        setError(productsArr.error);
      }
    };
    getProducts();
  }, []);
  return { products, isLoading, error };
};

export default useProducts;
