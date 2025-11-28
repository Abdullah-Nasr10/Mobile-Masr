import React from "react";
import "./ProductInfo.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/slices/cartSlice";
import { logout } from "../../../store/slices/usersSlice";
import { AiOutlineShoppingCart as Cart } from "react-icons/ai";
import { toast } from "react-toastify";

// Pass the whole `product` to avoid extra lookups
function AddToCartBtn({ product }) {
  const dispatch = useDispatch();
  const { loading, items } = useSelector(
    (state) => state.cart || { loading: false, items: [] }
  );

  const handleAdd = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first to add to cart");
      return;
    }
    // Stock guard: current quantity in cart + 1 must not exceed product.stock
    const productId = product?.id || product?._id;
    const existingItem = items?.find(
      (i) => (i.product?._id || i.product) === productId
    );
    const currentQty = existingItem?.quantity || 0;
    const availableStock = product?.stock;
    if (typeof availableStock === "number" && currentQty + 1 > availableStock) {
      toast.error("Out of stock: quantity exceeds available stock");
      return;
    }
    try {
      await dispatch(addToCart({ productId, quantity: 1 })).unwrap();
      toast.success("Added to cart successfully");
    } catch (err) {
      const msg = typeof err === "string" ? err : err?.message;
      if (msg?.toLowerCase().includes("not authorized")) {
        dispatch(logout());
        toast.error(
          "Not authorized. You have been logged out. Please login again."
        );
      } else {
        toast.error(msg || "Failed to add to cart");
      }
    }
  };

  return (
    <button
      className="abd-InfoAddToCartBtn w-100 center gap-3 "
      onClick={handleAdd}
      disabled={loading}
    >
      <Cart size={20} /> {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}

export default AddToCartBtn;
