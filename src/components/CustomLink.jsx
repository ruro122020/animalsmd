import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'

const CustomLink = ({ route, children }) => {
  const navigate = useNavigate()

  return (
    <Button sx={{ textDecoration: 'none' }} as={NavLink} onClick={() => navigate(route)}> {children}</Button>
  )
}

export default CustomLink
