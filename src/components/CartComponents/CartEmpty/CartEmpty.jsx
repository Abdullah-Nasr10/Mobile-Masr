import React from "react";
import "./CartEmpty.css";
function CartEmpty() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center abd-CartEmpty my-5">
      <img
        src="https://res.cloudinary.com/dj1omur11/image/upload/v1764541617/CartEmpty_w8xrvv.jpg"
        alt=""
        className="abd-CartEmpty-Image mb-4 w-50"
      />
      <div className="abd-CartEmpty-Text fs-2 fw-bold">Your cart is empty</div>
    </div>
  );
}

export default CartEmpty;
