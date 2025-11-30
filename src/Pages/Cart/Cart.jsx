import React, { useEffect } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../store/slices/cartSlice";
import PagePath from "../../components/GlobalComponents/PagePath/PagePath";
import CartEmpty from "../../components/CartComponents/CartEmpty/CartEmpty";
import CartCheckout from "../../components/CartComponents/CartCheckout/CartCheckout";

const Cart = () => {
  const dispatch = useDispatch();

  const { items, totalPrice, loading, error } = useSelector(
    (state) => state.cart || {}
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch, token]);

  if (!token) {
    return (
      <div className="abd-Cart-Page container my-4">
        <PagePath path="Cart" />
        <p>Please login to view your cart</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="abd-Cart-Page container my-4">
        <PagePath path="Cart" />
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="abd-Cart-Page container my-4">
        <PagePath path="Cart" />
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="abd-Cart-Page container my-4">
        <PagePath path="Cart" />
        <CartEmpty />
      </div>
    );
  }

  return (
    <div className="abd-Cart-Page container my-4">
      <PagePath path="Cart" />
      <CartCheckout items={items} totalPrice={totalPrice} />
    </div>
  );
};

export default Cart;
