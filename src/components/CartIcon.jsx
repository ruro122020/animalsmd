import React from 'react'
import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingCartCheckoutSharp';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const CartIcon = () => {
  const { itemCount } = useAuth()
  const navigate = useNavigate()
  const styles = {
    container: {
      position: 'relative',
      display: 'inline-block',
    },
    productsCount: {
      position: 'absolute',
      top: -5,
      right: -2,
      backgroundColor: 'red',
      borderRadius: '50%',
      color: 'white',
      padding: '0px 5px',
      fontSize: '12px'
    }
  };


  return (
    <div style={{ paddingRight: '15px', cursor: 'pointer' }} onClick={() => { navigate('/user/cart') }}>
      <div style={styles.container}>
        <ShoppingCartCheckoutSharpIcon sx={{ fontSize: 30 }} />
        <span style={styles.productsCount}>{itemCount}</span>
      </div>
    </div>
  )
}

export default CartIcon
