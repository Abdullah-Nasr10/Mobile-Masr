import React, { useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import checkRespons from "../../utilities/checkAuth";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkRespons("cart", navigate);
  }, [navigate]);

  return (
    <>
      <div>Cart</div>
    </>
  );
};

export default Cart;
