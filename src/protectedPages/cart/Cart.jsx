import React, { useState, useEffect } from 'react'
import { deleteData, getData, updateData } from '../../api'
import CartProductCard from './CartProductCard'
import { useCartContext } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { setCartItemsCount } = useCartContext()
  const navigate = useNavigate()


  useEffect(() => {
    //GET CART ITEMS FROM USERS CART
    const getCartProducts = async () => {
      const userCartProducts = await getData('/api/user/cart')
      if (userCartProducts) {
        setCartProducts(userCartProducts)
        setIsLoading(false)
      }
    }
    getCartProducts()
  }, [])

  const handleCheckout = async () => {
    const productsList = cartProducts.map(cart => {
      return { "product": cart.product, "quantity": cart.quantity }
    })
    //to avoid hitting the api to many time the carts products will be stored in locals storage
    //so that it can be used in the CheckoutForm component
    localStorage.setItem('checkoutProducts', JSON.stringify(productsList))
    navigate('/user/checkout')
  }

  const handleProductQuantity = async (quantity, cartId) => {
    //update product quantity in database
    const updateCart = await updateData(`/api/user/cart/${cartId}`, { "quantity": quantity })
    //update product quantity in cartProducts state
    const updateCartProducts = cartProducts.map(cart => {
      if (cart.id === cartId) {
        return updateCart
      } else {
        return cart
      }
    })
    setCartProducts(updateCartProducts)
  }

  const handleProductDelete = async (cartId) => {
    const deleteProduct = await deleteData(`/api/user/cart/${cartId}`)
    if (deleteProduct) {
      const newProductList = cartProducts.filter(cart => cart.id !== cartId)
      setCartProducts(newProductList)
      setCartItemsCount(newProductList.length)
    }
  }

  if (isLoading) return <p>Loading ...</p>
  const total = cartProducts.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.quantity * currentValue.product.price
  }, 0)

  return (
    <Grid container justifyContent='center' sx={{ padding: '15px', flexDirection: 'column' }}>
      <h1 style={{ borderBottom: '1px solid lightgrey' }}>Your Cart</h1>
      {cartProducts.length > 0 ?
        <div style={{ width: '100%', display: 'flex' }}>
          <Grid container rowGap={2} justifyContent='center' sx={{ paddingRight: '15px' }}>
            {cartProducts.map(product =>
              <Grid item xs={12} md={12} sx={{ display: 'flex' }} key={product.id}>
                <CartProductCard key={product.id} product={product} handleProductQuantity={handleProductQuantity} handleProductDelete={handleProductDelete} />
              </Grid>
            )}
          </Grid>

          <Grid sx={{ width: '40%' }} >
            <Card variant="outlined" sx={{ maxWidth: '100%' }}>
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="h5" component="div">
                  SUMMARY
                </Typography>
                <Stack>
                  {/* Display the products name, quantity, and total price in here */}
                  {cartProducts.map(({ product, quantity }) => {
                    return (
                      <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p>{product.name.toUpperCase()}</p>
                        <p> x{quantity}</p>
                        <p>${quantity * product.price}</p>
                      </div>
                    )
                  })}
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }} >
                <Box>
                  Total:
                </Box>
                <Box>
                  ${total}
                </Box>
              </Box>
              <div style={{ background: 'black' }}>
                <Button onClick={handleCheckout} sx={{ width: '100%', color: 'white' }}>Checkout</Button>
              </div>
            </Card>
          </Grid>
        </div>
        :
        <Box>Cart is Empty</Box>}

    </Grid >
  )
}

export default Cart
