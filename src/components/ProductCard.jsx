import React, { useState } from 'react'
import CustomButton from '../components/form/CustomButton'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import medicineBottle from '../assets/products-media/medicinebottle.jpg'
import { postData } from '../api'
import { useCartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Alert from '@mui/material/Alert';

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { setCartItemsCount } = useCartContext()
  const { name, description, prescription, price, id } = product
  const { user } = useAuth()
  const [showAlert, setShowAlert] = useState(false)

  const handleProduct = async () => {
    //POST ITEM TO USERS CART IN THE DATABASE
    const cartObj = {
      "user_id": user.id,
      "product_id": id,
      "quantity": 1

    }
    const product = await postData('/api/user/cart', cartObj)
    if (product) {
      setCartItemsCount(prevState => prevState + 1)
    } else {
      setShowAlert(true)
    }
  }

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={medicineBottle}
        title="medication bottle"
      />
      <CardContent>
        <Typography gutterBottom component="div">
          {name.toUpperCase()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${price}
        </Typography>
        {prescription && <Typography variant="body2" color="text.secondary">
          *Prescription Needed
        </Typography>}
        {showAlert && <Alert severity="error">product is already in cart</Alert>}
      </CardContent>
      <CardActions>
        {/**if product needs prescription, purchase button is disabled */}
        <CustomButton isDisabled={prescription} onClick={handleProduct}>Add to Cart</CustomButton>
      </CardActions>
    </Card>
  )
}

export default ProductCard
