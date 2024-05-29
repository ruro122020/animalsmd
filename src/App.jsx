import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useAuth } from './context/AuthContext'
import { getData } from './api'

const App = () => {
  const { login, updateUser } = useAuth()
  useEffect(() => {
    const checkUserStatus = async () => {
      const response = await getData('/api/check_session')
      if (response) {
        login()
        updateUser(response)
        console.log('response in App', response)
      }
      console.log('response in App', response)
    }
    checkUserStatus()
  }, [])

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
