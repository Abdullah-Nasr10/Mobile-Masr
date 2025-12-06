import React from "react";
import "./CartNavbar.css";
import { useLocation } from "react-router-dom";

function CartNavbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="abd-CartNavbar d-flex align-items-center justify-content-evenly gap-4 my-4">
      <div
        className={`abd-cart-link ${currentPath === "/cart" ? "active" : ""}`}
      >
        1. shopping cart
      </div>
      <div
        className={`abd-cart-link ${
          currentPath === "/cart/checkout" ? "active" : ""
        }`}
      >
        2. checkout
      </div>
      <div
        className={`abd-cart-link ${
          currentPath === "/cart/order-success" ? "active" : ""
        }`}
      >
        3. order success
      </div>
    </div>
  );
}

export default CartNavbar;
