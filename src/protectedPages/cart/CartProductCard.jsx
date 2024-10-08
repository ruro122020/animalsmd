import React, { useEffect, useState } from "react";

const CartProductCard = ({
  product,
  handleProductQuantity,
  handleProductDelete,
}) => {
  const { id: cartId, product: item, quantity } = product;
  const [quantityChange, setQuantityChange] = useState(0);

  useEffect(() => {
    setQuantityChange(quantity);
  }, []);

  return (
    <div>
      <div>
        <div>
          <h5>{item.name.toUpperCase()}</h5>
          <h6>${item.price}</h6>
        </div>
        <p>{item.description}</p>
      </div>
      <div>
        <div>
          <div>
            <input type="text" value={quantityChange} readOnly size="1" />

            {/**Minus Button */}
            <button
              onClick={() => {
                setQuantityChange(Math.max(quantityChange - 1, 1));
                {
                  /**Due to how state works, handleProductQuantity does not get the updated state from setQuantityChange */
                }
                handleProductQuantity(Math.max(quantityChange - 1, 1), cartId);
              }}
            >
              -
            </button>

            {/**Minus Button */}
            <button
              onClick={() => {
                setQuantityChange(quantityChange + 1);
                handleProductQuantity(quantityChange + 1, cartId);
              }}
            >
              +
            </button>
          </div>
          <button onClick={() => handleProductDelete(cartId)}>Delete</button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CartProductCard;
