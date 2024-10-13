import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { postData } from "../../../../services/api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPEKEY);

const CheckoutForm = () => {
  const fetchClientSecret = useCallback(async () => {
    const cartList = localStorage.getItem("checkoutProducts");
    const parsedCartList = JSON.parse(cartList);
    const getClientSecret = await postData(
      "/api/user/create-checkout-session",
      parsedCartList
    );
    return getClientSecret.clientSecret;
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;
