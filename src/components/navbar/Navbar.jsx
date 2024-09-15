// import React, { useState, useEffect } from 'react'
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import { NavLink } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext';
// import { deleteData, getData } from '../../api'
// import CartIcon from '../CartIcon'
// import { useCartContext } from '../../context/CartContext';
// import { pages, identity, settings } from './links'



import React, { useState, useEffect } from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import { Avatar, Dropdown, Button, Navbar as Nav } from 'flowbite-react'
import { useAuth } from '../../context/AuthContext';
import { useCartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { deleteData, getData } from '../../api'

const Navbar = () => {
  //useAuth is from AuthContext.jsx file
  const { isLoggedIn, logout, updateUser, user } = useAuth()
  const { cartItemsCount, setCartItemsCount } = useCartContext()
  const navigate = useNavigate()

  useEffect(() => {
    const getCartProducts = async () => {
      const cartProducts = await getData('/api/user/cart')
      if (cartProducts.length > 0) {
        setCartItemsCount(cartProducts.length)
      }
    }
    if (isLoggedIn) {
      getCartProducts()
    }
  }, [isLoggedIn])


  const handleLogout = async () => {
    const success = await deleteData('/api/logout')
    if (success) {
      logout()
      updateUser(null)
      navigate('/')
    }
  }

  console.log('user', user)
  return (
    <Nav fluid rounded className='bg-dark-grey-1'>
      <Nav.Brand as={RouterLink} to="/">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="animalsmd" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">AnimalsMD</span>
      </Nav.Brand>
      <Nav.Collapse>
        <Nav.Link as={RouterLink} to="/" className='text-light-grey' >Home</Nav.Link>
        <Nav.Link as={RouterLink} to="/products" className='text-light-grey'>Products</Nav.Link>
        {!isLoggedIn && <Nav.Link as={RouterLink} to="/login" className='text-light-grey'>Login</Nav.Link>}
      </Nav.Collapse>

      {isLoggedIn ? <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user.name}</span>
            <span className="block truncate text-sm font-medium">{user.email}</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => navigate('/user/dashboard')}>Dashboard</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => handleLogout()}>Sign out</Dropdown.Item>
        </Dropdown>
        <Nav.Toggle />
      </div>
        :
        <div className="flex md:order-2">
          {/**Get started on Pet assessment */}
          <Button className='' onClick={() => navigate('/signup')}>Get started</Button>
          <Nav.Toggle />
        </div>}
    </Nav>
  )
}

export default Navbar



{/**OLD VERSION OF NAVBAR */ }

//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleLogout = async () => {
//     const success = await deleteData('/api/logout')
//     if (success) {
//       logout()
//       updateUser(null)
//     }
//   }

//   <AppBar position="sticky" sx={{ background: '#3995ae' }}>
// <Container maxWidth="xl">
//   <Toolbar disableGutters>
//     <Typography
//       variant="h6"
//       noWrap
//       component="a"
//       href="#app-bar-with-responsive-menu"
//       sx={{
//         mr: 2,
//         display: { xs: 'none', md: 'flex' },
//         fontFamily: 'monospace',
//         fontWeight: 700,
//         letterSpacing: '.3rem',
//         color: 'inherit',
//         textDecoration: 'none',
//       }}
//     >
//       AnimalsMD
//     </Typography>

//     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//       <IconButton
//         size="large"
//         aria-label="account of current user"
//         aria-controls="menu-appbar"
//         aria-haspopup="true"
//         onClick={handleOpenNavMenu}
//         color="inherit"
//       >
//         <MenuIcon />
//       </IconButton>
//       <Menu
//         id="menu-appbar"
//         anchorEl={anchorElNav}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         keepMounted
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//         open={Boolean(anchorElNav)}
//         onClose={handleCloseNavMenu}
//         sx={{
//           display: { xs: 'block', md: 'none' },
//         }}
//       >
//         {pages.map(({ route, page }) => (
//           <MenuItem
//             key={page}
//             onClick={handleCloseNavMenu}
//             component={NavLink}
//             to={route}
//             sx={{ my: 2, display: 'block', textDecoration: 'none' }}
//           >
//             {page}
//           </MenuItem>
//         ))}
//         {!isLoggedIn &&
//           identity.map(({ route, page }) => (
//             <MenuItem
//               key={page}
//               onClick={handleCloseNavMenu}
//               component={NavLink}
//               to={route}
//               sx={{ my: 2, display: 'block', textDecoration: 'none' }}
//             >
//               {page}
//             </MenuItem>
//           ))}
//       </Menu>
//     </Box>
//     <Typography
//       variant="h5"
//       noWrap
//       component="a"
//       href="#app-bar-with-responsive-menu"
//       sx={{
//         mr: 2,
//         display: { xs: 'flex', md: 'none' },
//         flexGrow: 1,
//         fontFamily: 'monospace',
//         fontWeight: 700,
//         letterSpacing: '.3rem',
//         color: 'inherit',
//       }}
//     >
//       AnimalsMD
//     </Typography>
//     //This section is the desktop size 
// <Box sx={{
//   flexGrow: 1,
//   display: { xs: 'none', md: 'flex' },
// }}>
//   <Box sx={{
//     flexGrow: 1,
//     display: { xs: 'none', md: 'flex' },
//   }}>
//     {pages.map(({ route, page }) => (
//       <Button
//         key={page}
//         as={NavLink}
//         to={route}
//         onClick={handleCloseNavMenu}
//         sx={{
//           my: 2, color: 'white', display: 'block', textAlign: 'end', textDecoration: 'none',
//         }}
//       >
//         {page}
//       </Button>
//     ))}
//   </Box>
//   <Box sx={{
//     flexGrow: 1,
//     display: { xs: 'none', md: 'flex' },
//     justifyContent: 'end'
//   }}>
//     {!isLoggedIn &&
//       identity.map(({ route, page }) => (
//         <Button
//           key={page}
//           as={NavLink}
//           to={route}
//           onClick={handleCloseNavMenu}
//           sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
//         >
//           {page}
//         </Button>
//       ))}
//   </Box>
// </Box>
// { isLoggedIn && cartItemsCount > 0 && <CartIcon /> }
// {
//   isLoggedIn &&
//     <Box sx={{ flexGrow: 0 }}>
//       <Tooltip title="Open settings">
//         <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//           <Avatar
//             alt="Your Photo"
//           // src={user.image_url} 
//           />

//         </IconButton>
//       </Tooltip>
//       <Menu
//         sx={{ mt: '45px' }}
//         id="menu-appbar"
//         anchorEl={anchorElUser}
//         anchorOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//         keepMounted
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//         open={Boolean(anchorElUser)}
//         onClose={handleCloseUserMenu}
//       >
//         {settings.map(({ route, page }) => (
//           <MenuItem key={page} onClick={handleCloseUserMenu}>
//             <Typography
//               textAlign="center"
//               as={NavLink}
//               to={route}
//               sx={{
//                 textDecoration: 'none',
//               }}
//             >{page}</Typography>
//           </MenuItem>
//         ))}
//         <MenuItem onClick={handleCloseUserMenu}>
//           <Typography
//             textAlign="center"
//             as={NavLink}
//             to='/'
//             onClick={handleLogout}
//             sx={{ textDecoration: 'none' }}
//           >Logout</Typography>
//         </MenuItem>
//       </Menu>
//     </Box>
// }
//   </Toolbar >
// </Container >
// </AppBar > 
