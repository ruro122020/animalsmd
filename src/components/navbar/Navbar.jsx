import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { deleteData, getData } from '../../api'
import CartIcon from '../CartIcon'
import { useCartContext } from '../../context/CartContext';
import { pages, identity, settings } from './links'


const Navbar = () => {
  //useAuth is from AuthContext.jsx file
  const { isLoggedIn, logout, updateUser, user } = useAuth()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { cartItemsCount, setCartItemsCount } = useCartContext()

  useEffect(() => {
    const getCartProducts = async () => {
      const cartProducts = await getData('/api/user/cart')
      if (cartProducts.length > 0) {
        setCartItemsCount(cartProducts.length)
      }
    }
    getCartProducts()
  }, [])
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    const success = await deleteData('/api/logout')
    if (success) {
      logout()
      updateUser(null)
    }
  }

  return (
    <AppBar position="sticky" sx={{ background: '#3995ae' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AnimalsMD
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ route, page }) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={NavLink}
                  to={route}
                  sx={{ my: 2, display: 'block', textDecoration: 'none' }}
                >
                  {page}
                </MenuItem>
              ))}
              {!isLoggedIn &&
                identity.map(({ route, page }) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    component={NavLink}
                    to={route}
                    sx={{ my: 2, display: 'block', textDecoration: 'none' }}
                  >
                    {page}
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
            }}
          >
            AnimalsMD
          </Typography>
          {/*This section is the desktop size */}
          <Box sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
          }}>
            <Box sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}>
              {pages.map(({ route, page }) => (
                <Button
                  key={page}
                  as={NavLink}
                  to={route}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2, color: 'white', display: 'block', textAlign: 'end', textDecoration: 'none',
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'end'
            }}>
              {!isLoggedIn &&
                identity.map(({ route, page }) => (
                  <Button
                    key={page}
                    as={NavLink}
                    to={route}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
                  >
                    {page}
                  </Button>
                ))}
            </Box>
          </Box>
          {/**If user is logged in and the global state called cartItemsCount is more than 0, display cart icon and the number of items */}
          {isLoggedIn && cartItemsCount > 0 && <CartIcon />}
          {
            isLoggedIn &&
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Your Photo"
                  // src={user.image_url} 
                  />

                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(({ route, page }) => (
                  <MenuItem key={page} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      as={NavLink}
                      to={route}
                      sx={{
                        textDecoration: 'none',
                      }}
                    >{page}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    as={NavLink}
                    to='/'
                    onClick={handleLogout}
                    sx={{ textDecoration: 'none' }}
                  >Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>

  )
}

export default Navbar
