import React from "react";
import "./BannerGrid.css";

const banners = [
  {
    img: "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762715545/s3_hgwr5b.webp",
    link: "#",
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
        <a
          key={i}
          href={banner.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`geh-banner-item ${
            banner.span === "big" ? "geh-banner-big" : "geh-banner-small"
          }`}
        >
          <img src={banner.img} alt={`Banner ${i + 1}`} />
        </a>
      ))}
    </div>
  );
};

export default BannerGrid;
