import React, { useState, useEffect } from "react";
import { useAuth } from "../features/authentication/context/AuthContext";

const useCheckoutSession = () => {
  const { login, updateUser, logout } = useAuth();

  useEffect(() => {
    const checkUserStatus = async () => {
      const response = await getData("/api/check_session");
      //when response is a 401, the api is return an object with a error property in it.
      //so if response.error doesn't exist, proceed to login the user
      if (response.status === "success") {
        login();
        updateUser(response);
      } else if (response.status === "failed") {
        logout();
        console.log("response", response);
      }
    };
    checkUserStatus();
  }, []);
};

export default useCheckoutSession;
