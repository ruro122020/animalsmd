import React, { useState } from 'react'
import CustomButton from '../components/form/CustomButton'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import productPicture from '../assets/products-media/productPicture.jpg'
import { postData } from '../api'
import { useCartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const color = '#FFFFFF'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { setCartItemsCount } = useCartContext()
  //prescription is a boolean
  const { name, description, prescription, price, id } = product
  const { user, isLoggedIn } = useAuth()
  const [showAlert, setShowAlert] = useState(false)

  const handleProduct = async () => {
    //POST ITEM TO USERS CART IN THE DATABASE
    const cartObj = {
      "user_id": user.id,
      "product_id": id,
      "quantity": 1

    }
    if (isLoggedIn) {
      const product = await postData('/api/user/cart', cartObj)
      if (product) {
        setCartItemsCount(prevState => prevState + 1)
      } else {
        setShowAlert(true)
      }
    } else {
      navigate('/login')
    }
  }

  return (
    <div
      style={{ border: '1px solid lightgray' }}
    >
      <Box
        component="img"
        src={productPicture}
        sx={{ width: '15%', height: 'auto' }} />
      <div>
        <Typography >
          {name.toUpperCase()}
        </Typography>
        <Typography >
          ${price}
        </Typography>
        {showAlert && <Alert severity="error">product is already in cart</Alert>}
      </div>
      <div>
        {/**if product needs prescription, purchase button is disabled */}
        <Button
          variant="outlined"
          sx={{
          }}
          onClick={handleProduct}>
          {prescription ? 'Need Prescription' : 'Add Cart'}
        </Button>
      </div>
    </div >
  )
}

export default ProductCard
