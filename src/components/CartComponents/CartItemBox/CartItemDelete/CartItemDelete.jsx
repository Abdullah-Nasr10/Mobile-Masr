import React from "react";
import "./CartItemDelete.css";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../../store/slices/cartSlice";
import { logout } from "../../../../store/slices/usersSlice";
import { toast } from "react-toastify";

function CartItemDelete({ productId }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(removeFromCart({ productId })).unwrap();
      toast.success("Item removed from cart");
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
        toast.error(msg || "Failed to remove item");
      }
    }
  };

  return (
    <div
      className="abd-itemDelete center"
      title="Delete Item"
      onClick={handleDelete}
    >
      <MdDeleteOutline size={24} style={{ cursor: "pointer" }} />
    </div>
  );
}

export default CartItemDelete;
