import App from "./App";
import Home from "./pages/Home";
import Login from "./features/authentication/login/Login";
import Form1 from "./features/petassessment/Form1";
import Form2 from "./features/petassessment/Form2";
import PetAssessmentLayer from "./features/petassessment/component/PetAssessmentProviderLayer";
import Products from "./features/store/Products";
import Signup from "./features/authentication/signup/Signup";
import Dashboard from "./features/profile/dashboard/Dashboard";
import Profile from "./features/profile/Profile";
import Account from "./features/profile/account/Account";
import UsersNavLayout from "./features/profile/layouts/UsersNavLayout";
import PetAssessmentResults from "./features/petassessment/component/PetAssessmentResults";
import MorePetInfo from "./features/profile/dashboard/components/MorePetInfo";
import Cart from "./features/profile/cart/Cart";
import CheckoutForm from "./features/profile/cart/stripe/CheckoutForm";
import Return from "./features/profile/cart/stripe/Return";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/products", element: <Products /> },

      {
        path: "/pet-assessment",
        element: <PetAssessmentLayer />,
        children: [
          { path: "/pet-assessment/", element: <Form1 /> },
          { path: "/pet-assessment/form2", element: <Form2 /> },
          {
            path: "/pet-assessment/results",
            element: <PetAssessmentResults />,
          },
        ],
      },
      {
        path: "/user",
        element: <UsersNavLayout />,
        children: [
          { path: "/user/dashboard", element: <Dashboard /> },
          {
            path: "/user/dashboard/pets/:id/results",
            element: <MorePetInfo />,
          },
          { path: "/user/account", element: <Account /> },
          { path: "/user/profile", element: <Profile /> },
          { path: "/user/cart", element: <Cart /> },
          { path: "/user/checkout", element: <CheckoutForm /> },
          { path: "/user/return", element: <Return /> },
        ],
      },
    ],
  },
];

export default routes;
