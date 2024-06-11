import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavLink, useLocation } from 'react-router-dom';

const pages = [{
  route: '/user/profile',
  page: 'Profile'
},
{
  route: '/user/account',
  page: 'Account'
},

{
  route: '/user/dashboard',
  page: 'Dashboard'
}
]
const drawerWidth = 200;

const SideBarMenu = () => {
  const location = useLocation()
  return (
    <Box sx={{ overflow: 'auto', borderRight: '5px solid lightgrey', width: drawerWidth }} >
      <List sx={{ paddingTop: '12px' }}>
        {pages.map(({ route, page }) => (
          <ListItem key={page} >
            <ListItemButton selected={location.pathname === route} as={NavLink} to={route}>
              <ListItemText primary={page} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default SideBarMenu;
