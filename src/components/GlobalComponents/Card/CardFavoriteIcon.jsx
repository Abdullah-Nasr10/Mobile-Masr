import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
function CardFavoriteIcon() {
  const [isFav, setIsFav] = useState(false);
  return (
    <FaHeart
      className={`abd-Icon-Favorite ${isFav ? "text-danger" : ""}`}
      onClick={() => setIsFav(!isFav)}
    />
  );
}

export default CardFavoriteIcon;
