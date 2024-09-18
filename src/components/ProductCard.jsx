import React, { useState, useRef, useEffect } from 'react'
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
import gsap from 'gsap'



const color = '#FFFFFF'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { setCartItemsCount } = useCartContext()
  //prescription is a boolean
  const { name, description, prescription, price, id } = product
  const { user, isLoggedIn } = useAuth()
  const [showAlert, setShowAlert] = useState(false)
  const cardRef = useRef(null)


  useEffect(() => {
    const card = cardRef.current
    gsap.fromTo(card, {
      // opacity: 5,
      y: 100,
      opacity: 0

    }, {
      y: 0,
      ease: 'power1.in',
      opacity: 1,
      duration: 1.5
    })

  }, [])

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
      ref={cardRef}
      className="THIS IS THE ONE!!!"
      sx={{
        display: 'flex',
        flexGrow: '1',
      }}>
      <CardActionArea>
        <div>
          <CardHeader title={name.toUpperCase()} titleTypographyProps={{ fontSize: '14px', textAlign: 'center' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CardMedia
            sx={{ height: 140, width: 140 }}
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
              {prescription ? <Box size="small">Need Prescription</Box> : <Button onClick={handleProduct} size="small">Buy</Button>}
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
