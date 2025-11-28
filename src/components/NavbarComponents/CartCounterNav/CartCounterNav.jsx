import React, { useEffect } from "react";
import { AiOutlineShoppingCart as Cart } from "react-icons/ai";
import "../Navbar/Navbar.css";
import { Link } from "react-router"; // keep as-is per existing usage
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../../store/slices/cartSlice";

function CartCounterNav() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart || { items: [] });
  // Direct access sufficient in client-only Vite app
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && (!items || items.length === 0)) {
      dispatch(fetchCart()).catch(() => {});
    }
  }, [dispatch, token]);

  const count =
    items?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  return (
    <Link to="/cart" className="abd-Cart d-none d-md-inline-block">
      <Cart />
      <div className="abd-CartCounter center">{count}</div>
    </Link>
  );
}

export default CartCounterNav;
