import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "./layouts/mainNavbar/MainNavbar";
import { useAuth } from "./features/authentication/context/AuthContext";
import { getData } from "./services/api";

/**IMPORTANT NOTE: AFTER CHECKING USER'S LOGIN STATUS,
 * CHECK IF USER HAS ANY ITEMS STORED IN CART TABLE
 * AND THEN SET ITEMSCOUNT FROM USEAUTH TO THE NUMBER OF ITEMS THEY HAVE
 */
const App = () => {
  const { login, updateUser, user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      const response = await getData("/api/check_session");
      //when response is a 401, the api is return an object with a error property in it.
      //so if response.error doesn't exist, proceed to login the user
      if (response.status === "success") {
        login();
        updateUser(response);
        setIsLoading(false);
      } else if (response.status === "failed") {
        setIsLoading(false);
        logout();
        console.log("response", response);
      }
    };
    checkUserStatus();
  }, []);

  if (isLoading) return <p>Loading ...</p>;
  return (
    <>
      <MainNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
