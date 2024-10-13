import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../profile/cart/context/CartContext";
import { MdOutlineShoppingCart } from "react-icons/md";

const CartIcon = () => {
  const { cartItemsCount } = useCartContext();
  const navigate = useNavigate();

  const styles = {
    container: {
      position: "relative",
      display: "inline-block",
    },
    productsCount: {
      position: "absolute",
      top: -5,
      right: -2,
      backgroundColor: "red",
      borderRadius: "50%",
      color: "white",
      padding: "0px 5px",
      fontSize: "12px",
    },
  };

  return (
    <div
      style={{ paddingRight: "15px", cursor: "pointer" }}
      onClick={() => {
        navigate("/user/cart");
      }}
    >
      <div style={styles.container}>
        <MdOutlineShoppingCart fontSize={30} />
        <span style={styles.productsCount}>{cartItemsCount}</span>
      </div>
    </div>
  );
};

export default CartIcon;
