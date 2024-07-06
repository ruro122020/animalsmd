import React, { useState, useEffect } from 'react'
import { deleteData, getData, postData, updateData } from '../../api'
import CartProductCard from './CartProductCard'
import { useCartContext } from '../../context/CartContext'
import CheckoutForm from '../../components/checkout/CheckoutForm'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { setCartItemsCount, setCheckoutProducts } = useCartContext()
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
    //update product quantity in carts table 
    const updateCart = await updateData(`/api/user/cart/${cartId}`, { "quantity": quantity })
    //NO FURTHER ACTION IS NEEDED AT THIS TIME
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
  return (
    <div >
      <div>
        {cartProducts.length > 0 ?
          <div>
            <h1>Cart Items</h1>
            {cartProducts.map(product =>
              <CartProductCard key={product.id} product={product} handleProductQuantity={handleProductQuantity} handleProductDelete={handleProductDelete} />
            )}
            <button onClick={handleCheckout}>Checkout</button>
          </div>
          :
          <div>
            Empty Cart
          </div>}

      </div>

    </div>
  )
}

export default Cart
