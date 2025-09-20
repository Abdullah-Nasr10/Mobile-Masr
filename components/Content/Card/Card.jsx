
import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import "./Card.css";

export default function Cart({ product }) {
  const [fav, setFav] = useState(false);

  return (
    <div className="geh-product-card card">
      {/* top row: status badge + icons */}
      <div className="geh-pc-top">
        <span className={`geh-status-badge ${product.status === "New" ? "new" : "used"}`}>
          {product.status}
        </span>

        <div className="geh-pc-icons">
          <button className="geh-icon-btn share" aria-label="share"><FaShareAlt /></button>
          <button className="geh-icon-btn fav" aria-label="favorite" onClick={() => setFav(!fav)}>
            {fav ? <FaHeart className="geh-fav-on" /> : <FaRegHeart />}
          </button>
        </div>
      </div>

      {/* image area */}
      <div className="geh-pc-image-wrap">
        
        <a href={product.link} className="geh-pc-image-link">
          <img src={product.image} alt={product.name} className="geh-pc-image" />
        </a>

        {/* small overlay badges (battery, warranty, dual-sim) */}
        <div className="geh-pc-overlays">
          <span className="geh-small-badge battery">🔋very good </span>
          <span className="geh-small-badge warranty">{product.warrantyText}</span>
          {/* <img src={product.dualSimIcon} alt="2sim" className="dual-sim" /> */}
        </div>

        {/* insurance green stripe under image */}
        <div className="geh-pc-insurance">
          <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden>
            <path d="M..." fill="#00A52E"></path>
          </svg>
          <span>{product.insuranceText}</span>
        </div>
      </div>

      {/* vendor, title, price */}
      <div className="geh-pc-body">
        <a href={product.vendorLink} className="geh-pc-vendor">{product.vendor}</a>
        <a href={product.link} className="geh-pc-title">{product.name}</a>

        <div className="geh-pc-price-row">
          <span className="geh-price-now">{product.priceNow}</span>
          {product.priceOld && <span className="geh-price-old">{product.priceOld}</span>}
        </div>

        {/*  Details button*/}
        <div>
          <button className="geh-pc-offer-btn">Offer Details</button>
        </div>
      </div>
    </div>
  );
}