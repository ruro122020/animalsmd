import React, { useState } from 'react'
import CustomButton from '../components/form/CustomButton'
import { useNavigate } from 'react-router-dom'
import { postData } from '../api'
import { useCartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import productPicture from '../assets/products-media/productPicture.jpg'
import {
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button
} from '@mui/material';
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
    <Card
      className="THIS IS THE ONE!!!"
      sx={{
        display: 'flex',
        flexGrow: '1',
        boxShadow: '0px 0px 6px 1px lightgray',
      }}>
      <CardActionArea>
        <div>
          <CardHeader title={name.toUpperCase()} titleTypographyProps={{ fontSize: '14px', textAlign: 'center' }} />
        </div>
        <div>
          <CardMedia
            sx={{ height: 140 }}
            image={productPicture}
            title="Product Image"
          />
        </div>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Typography variant="p" sx={{ color: 'text.secondary', fontSize: '20px' }}>
              ${price}
            </Typography>
            <div>
              {prescription ? <Box size="small">Need Prescription</Box> : <Button size="small">Buy</Button>}
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
