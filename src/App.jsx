import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useAuth } from './context/AuthContext'
import { getData } from './api'
const App = () => {

  useEffect(() => { }, [])

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
