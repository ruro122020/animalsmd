import React, { useState, useEffect } from 'react'
import { getData } from '../../api'
import CartProductCard from './CartProductCard'

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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

  if (isLoading) return <p>Loading ...</p>
  return (
    <div>
      <h1>Cart Items</h1>
      {cartProducts.map(product => <CartProductCard product={product} />)}
    </div>
  )
}

export default Cart
