import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

//custom hook
export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItemsCount, setCartItemsCount] = useState(0)
  const [checkoutProducts, setCheckoutProducts] = useState([])
  return (
    <div>
      <CartContext.Provider value={{ cartItemsCount, setCartItemsCount, checkoutProducts, setCheckoutProducts }}>
        {children}
      </CartContext.Provider>
    </div>
  )
}

