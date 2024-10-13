import { Outlet } from "react-router-dom";
import MainNavbar from "./layouts/mainNavbar/MainNavbar";
import useCheckoutSession from "./hooks/useCheckoutSession";

/**IMPORTANT NOTE: AFTER CHECKING USER'S LOGIN STATUS,
 * CHECK IF USER HAS ANY ITEMS STORED IN CART TABLE
 * AND THEN SET ITEMSCOUNT FROM USEAUTH TO THE NUMBER OF ITEMS THEY HAVE
 */
const App = () => {
  useCheckoutSession();
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
