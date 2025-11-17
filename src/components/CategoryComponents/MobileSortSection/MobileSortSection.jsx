import React from "react";
import "./MobileSortSection.css";

function MobileSortSection({ sortBy, onSortChange }) {
  return (
    <div className="mos-mobile-sort-section">
      <h4 className="mos-mobile-section-title">Sort By</h4>
      <div className="mos-sort-options">
        <div className="mos-sort-option-item">
          <input
            type="radio"
            id="sort-newest"
            name="sortOption"
            value="newest"
            checked={sortBy === "newest"}
            onChange={() => onSortChange("newest")}
          />
          <label htmlFor="sort-newest">Newest Arrival</label>
        </div>
        <div className="mos-sort-option-item">
          <input
            type="radio"
            id="sort-low"
            name="sortOption"
            value="priceLowToHigh"
            checked={sortBy === "priceLowToHigh"}
            onChange={() => onSortChange("priceLowToHigh")}
          />
          <label htmlFor="sort-low">Price Low to High</label>
        </div>
        <div className="mos-sort-option-item">
          <input
            type="radio"
            id="sort-high"
            name="sortOption"
            value="priceHighToLow"
            checked={sortBy === "priceHighToLow"}
            onChange={() => onSortChange("priceHighToLow")}
          />
          <label htmlFor="sort-high">Price High to Low</label>
        </div>
      </div>
    </div>
  );
}

export default MobileSortSection;
