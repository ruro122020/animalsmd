import React, { useEffect, useState } from 'react'

const CartProductCard = ({ product, handleProductQuantity }) => {

  const { id: cartId, product: item, quantity } = product
  const [quantityChange, setQuantityChange] = useState(0)
  useEffect(() => {
    setQuantityChange(quantity)
  }, [])

  const handleChange = (e) => {
    setQuantityChange(parseInt(e.target.value))
  }


  return (
    <div style={{ display: 'flex' }}>
      <div>{item.name}</div>
      <div>${item.price}</div>
      <input type='number' value={quantityChange} onChange={handleChange} />
      <button onClick={() => handleProductQuantity(quantityChange, cartId)}>Save</button>
      <button>Delete</button>
    </div>
  )
}

export default CartProductCard
