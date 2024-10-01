import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const pages = [
  {
    route: "/user/profile",
    page: "Profile",
  },
  {
    route: "/user/account",
    page: "Account",
  },

  {
    route: "/user/dashboard",
    page: "Dashboard",
  },
];

const SideBarMenu = () => {
  const location = useLocation();
  return (
    <div>
      <ul>
        {pages.map(({ route, page }) => (
          <li key={page}>
            <NavLink
              //selected not working. tailwind might have a active prefix for this
              selected={location.pathname === route}
              to={route}
            >
              <div>
                <span>{page}</span>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBarMenu;
