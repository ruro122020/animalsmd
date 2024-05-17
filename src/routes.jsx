import App from './App'
import Home from './pages/Home'
import Login from './pages/Login'
import PetAssessment from './pages/PetAssessment'
import Products from './pages/Products'
import Signup from './pages/Signup'
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/pet-assessment',
        element: <PetAssessment />
      },
      {
        path: '/products',
        element: <Products />
      }
    ]
  },
]

export default routes