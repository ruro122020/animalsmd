import React, { useState, useEffect } from "react";
import { deleteData, getData, updateData } from "../../api";
import CartProductCard from "./CartProductCard";
import { useCartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setCartItemsCount } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    //GET CART ITEMS FROM USERS CART
    const getCartProducts = async () => {
      const userCartProducts = await getData("/api/user/cart");
      if (!userCartProducts.error) {
        setCartProducts(userCartProducts);
      }
      setIsLoading(false);
    };
    getCartProducts();
  }, []);

  const handleCheckout = async () => {
    const productsList = cartProducts.map((cart) => {
      return { product: cart.product, quantity: cart.quantity };
    });
    //to avoid hitting the api to many time the carts products will be stored in locals storage
    //so that it can be used in the CheckoutForm component
    localStorage.setItem("checkoutProducts", JSON.stringify(productsList));
    navigate("/user/checkout");
  };

  const handleProductQuantity = async (quantity, cartId) => {
    //update product quantity in database
    const updateCart = await updateData(`/api/user/cart/${cartId}`, {
      quantity: quantity,
    });
    //update product quantity in cartProducts state
    const updateCartProducts = cartProducts.map((cart) => {
      if (cart.id === cartId) {
        return updateCart;
      } else {
        return cart;
      }
    });
    setCartProducts(updateCartProducts);
  };

  const handleProductDelete = async (cartId) => {
    const deleteProduct = await deleteData(`/api/user/cart/${cartId}`);
    if (deleteProduct) {
      const newProductList = cartProducts.filter((cart) => cart.id !== cartId);
      setCartProducts(newProductList);
      setCartItemsCount(newProductList.length);
    }
  };

  if (isLoading) return <p>Loading ...</p>;

  const total = cartProducts.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.quantity * currentValue.product.price;
  }, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartProducts.length > 0 ? (
        <div>
          <div>
            {cartProducts.map((product) => (
              <div>
                <CartProductCard
                  key={product.id}
                  product={product}
                  handleProductQuantity={handleProductQuantity}
                  handleProductDelete={handleProductDelete}
                />
              </div>
            ))}
          </div>

          <div sx={{ width: "40%" }}>
            <div variant="outlined" sx={{ maxWidth: "100%" }}>
              <div sx={{ p: 2 }}>
                <span gutterBottom variant="h5" component="div">
                  SUMMARY
                </span>
                <div>
                  {/* Display the products name, quantity, and total price in here */}
                  {cartProducts.map(({ product, quantity }) => {
                    return (
                      <div
                        key={product.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>{product.name.toUpperCase()}</p>
                        <p> x{quantity}</p>
                        <p>${quantity * product.price}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <hr />
              <div>
                <div>Total:</div>
                <div>${total}</div>
              </div>
              <div>
                <button onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Cart is Empty</div>
      )}
    </div>
  );
};

export default Cart;
