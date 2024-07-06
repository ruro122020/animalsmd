import React, { useEffect, useState } from 'react'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Card, CardActions, CardContent, TextField, Box, Typography } from '@mui/material';
import CustomButton from '../../components/form/CustomButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';


const CartProductCard = ({ product, handleProductQuantity, handleProductDelete }) => {
  const { id: cartId, product: item, quantity } = product
  const [quantityChange, setQuantityChange] = useState(0)

  useEffect(() => {
    setQuantityChange(quantity)
  }, [])

  return (
    <Box variant="outlined" sx={{ maxWidth: '100%' }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            {item.name.toUpperCase()}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            ${item.price}
          </Typography>
        </Stack>
        <Typography color="text.secondary" variant="body2">
          {item.description}
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }} >
          <ButtonGroup>
            <input type='text' value={quantityChange} readOnly size="1" style={{ textAlign: 'center' }} />
            <Button
              aria-label="reduce"
              onClick={() => {
                setQuantityChange(Math.max(quantityChange - 1, 1));
                {/**Due to how state works, handleProductQuantity does not get the updated state from setQuantityChange */ }
                handleProductQuantity(Math.max(quantityChange - 1, 1), cartId)
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <Button
              aria-label="increase"
              onClick={() => {
                setQuantityChange(quantityChange + 1);
                handleProductQuantity(quantityChange + 1, cartId)
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
          <CustomButton onClick={() => handleProductDelete(cartId)}>Delete</CustomButton>
        </div>
      </Box>
      <Divider />
    </Box>
  )
}

export default CartProductCard
