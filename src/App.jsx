import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useAuth } from './context/AuthContext'
import { getData } from './api'
import './index.css'
const App = () => {
  const { login, updateUser } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const checkUserStatus = async () => {
      const response = await getData('/api/check_session')
      if (response) {
        login()
        updateUser(response)
      }
    }
    checkUserStatus()
    setIsLoading(false)
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
