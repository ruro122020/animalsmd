import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import { useAuth } from './context/AuthContext'
import { getData } from './api'
// import './index.css'

/**IMPORTANT NOTE: AFTER CHECKING USER'S LOGIN STATUS,
 * CHECK IF USER HAS ANY ITEMS STORED IN CART TABLE
 * AND THEN SET ITEMSCOUNT FROM USEAUTH TO THE NUMBER OF ITEMS THEY HAVE
 */
const App = () => {
  const { login, updateUser, user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUserStatus = async () => {
      const response = await getData('/api/check_session')
      if (response) {
        login()
        updateUser(response)
        setIsLoading(false)
      }
    }
    checkUserStatus()
  }, [])

  if (isLoading) return <p>Loading ...</p>
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
