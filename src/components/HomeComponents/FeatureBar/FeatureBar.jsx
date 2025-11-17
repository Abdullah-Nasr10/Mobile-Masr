import React from "react";
import "./FeatureBar.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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
    flip: true,
  },
];

const FeatureBar = () => {
  return (
    <div className="container geh-feature-bar my-3">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        spaceBetween={15}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 1.2 },
          576: { slidesPerView: 1.5 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {features.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="geh-feature-card-mobile">
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeatureBar;



