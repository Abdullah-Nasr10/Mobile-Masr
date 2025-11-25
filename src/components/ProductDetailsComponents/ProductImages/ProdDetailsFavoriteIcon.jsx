import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../../store/slices/WishlistSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProdDetailsFavoriteIcon({ productId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist);
  const user = useSelector((state) => state.users?.user);
  const [isFav, setIsFav] = useState(false);

  // Check if product is in wishlist
  useEffect(() => {
    if (wishlist?.items && productId) {
      const inWishlist = wishlist.items.some(
        (item) => item._id === productId || item.toString() === productId
      );
      setIsFav(inWishlist);
    }
  }, [wishlist?.items, productId]);

  const handleToggle = async () => {
    // Check if user is logged in
    if (!user) {
      toast.error("Please login first to add to wishlist");
      navigate("/login");
      return;
    }

    try {
      const result = await dispatch(toggleWishlist(productId)).unwrap();
      if (result.action === "added") {
        toast.success("Added to wishlist");
      } else {
        toast.info("Removed from wishlist");
      }
    } catch (error) {
      toast.error(error || "Failed to update wishlist");
    }
  };

  return (
    <div
      className="abd-ProdIcon center"
      style={{
        backgroundColor: isFav ? "var(--red-color-light)" : "",
        cursor: wishlist?.isLoading ? "wait" : "pointer",
      }}
      onClick={handleToggle}
    >
      <FaHeart
        className={`abd-ProdFavoriteIcon ${isFav ? "text-danger" : ""}`}
      />
    </div>
  );
}

export default ProdDetailsFavoriteIcon;
