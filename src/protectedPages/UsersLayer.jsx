import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBarMenu from "../components/SideBarMenu";
import { useAuth } from "../context/AuthContext";

const UsersLayer = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  {
    /**maxwidth originally defaults to alot of padding on the right side */
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBarMenu />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UsersLayer;
