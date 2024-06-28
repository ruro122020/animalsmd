import React from 'react'
import { Typography, CardContent, Card } from '@mui/material'
import CustomButton from '../components/form/CustomButton'
import { useNavigate } from 'react-router-dom'
const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  return (
    <div >
      <CardContent>
        <Typography sx={{ paddingBottom: '12px' }}>{product.name.toUpperCase()}</Typography>
        <Typography>{product.description}</Typography>
        <Typography>${product.price}</Typography>
        <Typography>{product.prescription && "Prescription Needed"}</Typography>
        <CustomButton onClick={() => navigate(`/products/${product.id}`)}>Purchase</CustomButton>
      </CardContent>
    </div>
  )
}

export default ProductCard
