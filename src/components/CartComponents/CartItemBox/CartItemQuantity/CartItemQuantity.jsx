import React from "react";
import "./CartItemQuantity.css";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { updateCartQuantity } from "../../../../store/slices/cartSlice";
import { toast } from "react-toastify";
import { logout } from "../../../../store/slices/usersSlice";

function CartItemQuantity({ quantity, productId, stock }) {
  const dispatch = useDispatch();

  const handleUpdate = async (newQty) => {
    if (newQty < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
    if (stock && newQty > stock) {
      toast.error("Out of stock: quantity exceeds available stock");
      return;
    }
    try {
      await dispatch(
        updateCartQuantity({ productId, quantity: newQty })
      ).unwrap();
    } catch (err) {
      const msg = typeof err === "string" ? err : err?.message;
      if (
        msg?.toLowerCase().includes("unauth") ||
        msg?.toLowerCase().includes("not authorized") ||
        msg?.toLowerCase().includes("unauthorized")
      ) {
        dispatch(logout());
        toast.error(
          "Unauthorized. You have been logged out. Please login again."
        );
      } else {
        toast.error(msg || "Failed to update quantity");
      }
    }
  };

  return (
    <div className="abd-itemQuantity">
      <div
        className="abd-QuantityAction center"
        onClick={() => handleUpdate(quantity - 1)}
      >
        <FaMinus />
      </div>
      <span className="abd-QuantityValue">{quantity}</span>
      <div
        className="abd-QuantityAction center"
        onClick={() => handleUpdate(quantity + 1)}
      >
        <FaPlus />
      </div>
    </div>
  );
}

export default CartItemQuantity;
