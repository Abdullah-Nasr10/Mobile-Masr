import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchWishlist, clearAllWishlist } from "../../../store/slices/WishlistSlice";
import { toast } from "react-toastify";
import Card from "../../../components/GlobalComponents/Card/Card";
import { FaRegHeart } from "react-icons/fa";
import "./Favorites.css";

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { items: wishlistItems, isLoading } = useSelector(
    (state) => state.wishlist || {}
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchWishlist());
    } else {
      navigate("/login");
    }
  }, [dispatch, token, navigate]);

  const handleClearAllWishlist = () => {
    if (!wishlistItems.length) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete all items from your Favorites?"
    );

    if (confirmed) {
      dispatch(clearAllWishlist())
        .unwrap()
        .then(() => toast.success("Favorites cleared successfully"))
        .catch((error) => toast.error(error || "Failed to clear Favorites"));
    }
  };

  // EMPTY UI (MobileMasr style)
  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="mos-empty-container">

        {/* Heart Icon */}
        <FaRegHeart className="mos-empty-heart-icon" />

        <p className="mos-empty-text">
          There are no products in your Favorites
        </p>

        <button
          className="mos-empty-btn"
          onClick={() => navigate("/category/all")}
        >
          Add Products
        </button>

      </div>
    );
  }
  /* ---------------- NORMAL UI ---------------- */
  return (
    <div className="container my-3">
      <div className="mos-Favorites-header d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="mos-Favorites-title mb-1">Favorites</h2>
          <p className="text-muted mos-Favorites-count">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} Added
          </p>
        </div>

        <button
          className="btn btn-danger px-4 py-3"
          onClick={handleClearAllWishlist}
          disabled={!wishlistItems.length || isLoading}
        >
          {isLoading ? "Clearing..." : "Delete All"}
        </button>
      </div>

      {/* Product Grid */}
      <div className="mos-Favorites-grid">
        {wishlistItems.map((product) => (
          <div key={product._id} className="mos-Favorites-card p-2">
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
