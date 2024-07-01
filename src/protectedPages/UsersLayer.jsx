import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Container, Box } from '@mui/material'
import SideBarMenu from './SideBarMenu'
import { CartProvider } from '../context/CartContext'
import MorePetInfo from './dashboard/MorePetInfo'

const UsersLayer = () => {
  {/**maxwidth originally defaults to alot of padding on the right side */ }
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
