import React from "react";
import "./FeatureBar.css";

const features = [
  {
    title: "Diagnostic Tool Report",
    subtitle: "Generate a diagnostic report for your device",
    img: "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762703701/ico1_we1fiu.svg",
  },
  {
    title: "Guaranteed Sellers & Buyers",
    subtitle: "Secure Platform for your info and cards",
    img: "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762703701/ico2_gzqxy5.svg",
  },
  {
    title: "30 days warranty",
    subtitle: "Buy with warranty from Verified Stores",
    img: "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762703700/ico3_bwbcqx.svg",
  },
  {
    title: "Fast Delivery",
    subtitle: "Safe Delivery to All Governorates",
    img: "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762703700/ico4_idusrb.svg",
    flip: true, // علشان الصورة متعاكسة زي الأصل
  },
];

const FeatureBar = () => {
  return (
    <div className="geh-feature-bar ">
      <div className="geh-feature-container">
        {features.map((item, index) => (
          <React.Fragment key={index}>
            <div className="geh-feature-link">
              <img
                src={item.img}
                alt={item.title}
                className={`geh-feature-img ${item.flip ? "geh-flip" : ""}`}
              />
              <div>
                <p>{item.title}</p>
                <p>{item.subtitle}</p>
              </div>
            </div>
            {index < features.length - 1 && <div className="geh-divider"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FeatureBar;
