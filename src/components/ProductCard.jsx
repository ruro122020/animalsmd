import React from 'react'
import { Typography, CardContent, Card } from '@mui/material'
import CustomButton from '../components/form/CustomButton'

const ProductCard = ({ product }) => {

  const handleProduct = () => { }

  return (
    <div >
      <CardContent>
        <Typography sx={{ paddingBottom: '12px' }}>{product.name.toUpperCase()}</Typography>
        <Typography>{product.description}</Typography>
        <Typography>${product.price}</Typography>
        <Typography>{product.prescription && "Prescription Needed"}</Typography>
        <CustomButton onClick={handleProduct}>Purchase</CustomButton>
      </CardContent>
    </div>
  )
}

export default ProductCard
