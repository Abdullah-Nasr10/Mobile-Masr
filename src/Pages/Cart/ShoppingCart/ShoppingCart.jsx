import React from "react";
import "./ShoppingCart.css";
import CartButton from "../../../components/CartComponents/CartButton/CartButton";
import CartItemBox from "../../../components/CartComponents/CartItemBox/CartItemBox";
import { useNavigate, useOutletContext } from "react-router";

function ShoppingCart() {
  const outletContext = useOutletContext() || {};
  const items = outletContext.items || [];
  const totalPrice = outletContext.totalPrice || 0;
  const fmt = (n) =>
    new Intl.NumberFormat("en-EG", { maximumFractionDigits: 0 }).format(
      Math.round(n)
    );
  const navigate = useNavigate();

  return (
    <div className="abd-Cart-content mt-5 row">
      <div className="abd-Cart-items col-12 col-md-8">
        {items.map((item) => (
          <CartItemBox key={item.product?._id || item.product} item={item} />
        ))}
      </div>

      <div className="abd-CartChec mt-4 col-12 col-md-4">
        <div className="abd-CartTotalContainer mb-4 ">
          <h3 className=" fw-bold">Total: {fmt(totalPrice)} EGP</h3>
          <div className="text-danger">Excl. delivery</div>
        </div>
        <CartButton
          buttonText={"Checkout"}
          onClick={() => {
            navigate("/cart/checkout");
          }}
        />
        <CartButton
          buttonText={"Continue Shopping"}
          onClick={() => {
            navigate("/category/mobile");
          }}
        />
      </div>
    </div>
  );
}

export default ShoppingCart;
