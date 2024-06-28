import React from 'react'
import CustomButton from '../components/form/CustomButton'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import medicineBottle from '../assets/products-media/medicinebottle.jpg'
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { setItemCount } = useAuth()
  const { name, description, prescription, price, id } = product


  const handleProduct = async () => {
    setItemCount(prevState => prevState + 1)
    //POST ITEM TO USERS CART IN THE DATABASE
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
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
      </CardContent>
      <CardActions>
        {/**if product needs prescription, purchase button is disabled */}
        <CustomButton isDisabled={prescription} onClick={handleProduct}>Add to Cart</CustomButton>
      </CardActions>
    </Card>
  )
}

export default ProductCard
