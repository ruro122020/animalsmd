import React, { useState, useEffect } from 'react'
import SideBarMenu from './SideBarMenu'
import { Outlet } from 'react-router-dom'
import { Container, Box } from '@mui/material'
const UsersLayer = () => {
  return (
    <Container sx={{ marginLeft: 0 }}>
      <Box display="flex">
        {/* zIndex: 0 is what is making the SideBarMenu render under the main navbar */}
        <Box sx={{ zIndex: 0 }}>
          <SideBarMenu />
        </Box>
        <Box >
          <Outlet />
        </Box>
      </Box>
    </Container>
  )
}

export default UsersLayer
