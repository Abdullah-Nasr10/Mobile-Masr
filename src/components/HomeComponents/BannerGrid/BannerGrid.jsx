import React from "react";
import "./BannerGrid.css";
import { Link } from "react-router-dom";

const banners = [
  {
    img: "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762715545/s3_hgwr5b.webp",
    link: "/category/mobile/compare",
    span: "big",
  },
  {
    img: "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762715555/s2_ym6ro0.webp",
    link: "#",
    span: "small",
  },
  {
    img: "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762715559/s1_q7ljuv.webp",
    link: "#",
    span: "small",
  },
];

const BannerGrid = () => {
  return (
    <div className="geh-banner-grid container">
      {banners.map((banner, i) => (
        <Link
          key={i}
          to={banner.link}
          rel="noopener noreferrer"
          className={`geh-banner-item ${
            banner.span === "big" ? "geh-banner-big" : "geh-banner-small"
          }`}
        >
          <img src={banner.img} alt={`Banner ${i + 1}`} />
        </Link>
      ))}
    </div>
  );
};

export default BannerGrid;
