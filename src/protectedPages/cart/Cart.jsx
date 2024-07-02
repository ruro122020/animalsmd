import React, { useState, useEffect } from 'react'
import { getData, updateData } from '../../api'
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

  const handleCheckout = async () => {
    //
  }
  const handleProductQuantity = async (quantity, cartId) => {
    //update product quantity in carts table 
    const updateCart = await updateData(`/api/user/cart/${cartId}`, { "quantity": quantity })
    //NO FURTHER ACTION IS NEEDED AT THIS TIME
  }

  if (isLoading) return <p>Loading ...</p>
  return (
    <div >
      <h1>Cart Items</h1>
      <div >
        {cartProducts.map(product =>
          <CartProductCard product={product} handleProductQuantity={handleProductQuantity} />
        )}
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  )
}

export default Cart
