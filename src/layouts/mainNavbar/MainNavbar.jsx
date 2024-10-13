import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../features/authentication/context/AuthContext";
import { deleteData, getData } from "../../services/api";
import CartIcon from "../../features/store/components/CartIcon";
import { useCartContext } from "../../features/profile/cart/context/CartContext";
import { pages, identity, profile } from "./links";

const MainNavbar = () => {
  //useAuth is from AuthContext.jsx file
  const { isLoggedIn, logout, updateUser, user } = useAuth();
  const { cartItemsCount, setCartItemsCount } = useCartContext();

  useEffect(() => {
    const getCartProducts = async () => {
      const cartProducts = await getData("/api/user/cart");
      if (cartProducts.length > 0) {
        setCartItemsCount(cartProducts.length);
      }
    };
    if (isLoggedIn) {
      getCartProducts();
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    const success = await deleteData("/api/logout");
    if (success) {
      logout();
      updateUser(null);
    }
  };
  return (
    <div>
      <div>
        <h3>AnimalsMD</h3>
        <div>
          <div>
            {/**Main Navigation Links */}
            {pages.map(({ route, page }) => (
              <NavLink key={page} to={route}>
                {page}
              </NavLink>
            ))}

            {/** User Profile Links. This section is displayed when user is not logged in. */}

            {isLoggedIn &&
              profile.map(({ route, page }) => (
                <NavLink key={page} to={route}>
                  {page}
                </NavLink>
              ))}

            {/**Logout Button */}
            {isLoggedIn && <button onClick={handleLogout}>Logout</button>}

            {/* SignUp/Login Links. This section is displayed when user is not logged in. */}
            {!isLoggedIn &&
              identity.map(({ route, page }) => (
                <NavLink key={page} to={route}>
                  {page}
                </NavLink>
              ))}
            {/************************************************************************/}
          </div>
        </div>
        {isLoggedIn && cartItemsCount > 0 && <CartIcon />}
      </div>
    </div>
  );
};

export default MainNavbar;