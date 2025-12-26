import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./HeroSlider.css";

const slides = [
  {
    imageUrl:
      "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762698938/1_ux2qjk.webp",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dj1omur11/image/upload/v1766769540/ChatGPT_Image_Dec_26_2025_06_46_07_PM_2_dkn6yh.png",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762698938/2_qve5cv.webp",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762698939/5_xfim4d.webp",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762698939/3_sry7wf.webp",
  },
];

const HeroSlider = () => {
  return (
    <div className="geh-hero-slider">
      <div className="container">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="geh-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="geh-slide">
                <img src={slide.imageUrl} alt="" className="img-fluid" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSlider;
