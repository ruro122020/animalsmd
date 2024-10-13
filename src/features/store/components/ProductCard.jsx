import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../../services/api";
import { useCartContext } from "../../profile/cart/context/CartContext";
import { useAuth } from "../../authentication/context/AuthContext";
import productPicture from "../../../assets/products-media/productPicture.jpg";
import gsap from "gsap";

const color = "#FFFFFF";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { setCartItemsCount } = useCartContext();
  //prescription is a boolean
  const { name, description, prescription, price, id } = product;
  const { user, isLoggedIn } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    gsap.fromTo(
      card,
      {
        // opacity: 5,
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
      }
    );
  }, []);

  const handleProduct = async () => {
    //POST ITEM TO USERS CART IN THE DATABASE
    const cartObj = {
      user_id: user.id,
      product_id: id,
      quantity: 1,
    };
    if (isLoggedIn) {
      const product = await postData("/api/user/cart", cartObj);
      console.log("product", product);
      if (product) {
        setCartItemsCount((prevState) => prevState + 1);
      } else {
        setShowAlert(true);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      {/**HEADER */}
      <div>
        <h5>{name.toUpperCase()}</h5>
      </div>

      {/**IMAGE */}
      <div>
        <img
          src={productPicture}
          title="Product Image"
          width={100}
          height={100}
        />
      </div>
      {/**CONTENT */}
      <div>
        <div>
          <p>${price}</p>
          <div>
            {prescription ? (
              <p size="small">Need Prescription</p>
            ) : (
              <button onClick={handleProduct} size="small">
                Buy
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
