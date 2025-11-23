import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
function ProdDetailsFavoriteIcon() {
  const [isFav, setIsFav] = useState(false);
  return (
    <div
      className="abd-ProdIcon center"
      style={{
        backgroundColor: isFav ? "var(--red-color-light)" : "",
      }}
      onClick={() => setIsFav(!isFav)}
    >
      <FaHeart
        className={`abd-ProdFavoriteIcon ${isFav ? "text-danger" : ""}`}
      />
    </div>
  );
}

export default ProdDetailsFavoriteIcon;
