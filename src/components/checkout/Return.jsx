import React, { useState, useEffect } from 'react'
import { useCartContext } from '../../context/CartContext';
import { getData } from '../../api';

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const { setCartItemsCount } = useCartContext()

  useEffect(() => {
    const checkoutSessionStatus = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get('session_id');

      const checkoutStatus = await getData(`/api/user/session-status?session_id=${sessionId}`)
      if (checkoutStatus) {
        setStatus(checkoutStatus.status)
        setCustomerEmail(checkoutStatus.customer_email)
        //remove cart items from users cart in the database
        //remove checkoutProducts from localStorage
        //reset cartItemsCount to 0
        setCartItemsCount(0)
      }
    }
    checkoutSessionStatus()

  }, []);

  if (status === 'open') {
    return (
      <Navigate to="/user/checkout" />
    )
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null;
}

export default Return
