import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Container, Box } from '@mui/material'
import SideBarMenu from '../components/SideBarMenu'
import { useAuth } from '../context/AuthContext'

const UsersLayer = () => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  {/**maxwidth originally defaults to alot of padding on the right side */ }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [])
  return (
    <Container maxWidth={false} sx={{ marginLeft: 0, padding: '0 !important' }}>
      <Box display="flex">
        <SideBarMenu />
        <Box >
          <Outlet />
        </Box>
      </Box>
    </Container>
  )
}

export default UsersLayer
