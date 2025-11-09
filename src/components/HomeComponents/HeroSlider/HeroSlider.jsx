
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./HeroSlider.css";



const slides = [
  {
    imageUrl: "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762698938/1_ux2qjk.webp",
  },
  {
    imageUrl: "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762698938/4_dghzqy.webp",
  },
  {
    imageUrl: "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762698938/2_qve5cv.webp",
  },
  {
    imageUrl:"https://res.cloudinary.com/dfigu6nnn/image/upload/v1762698939/5_xfim4d.webp",
  },
  {
    imageUrl:"https://res.cloudinary.com/dfigu6nnn/image/upload/v1762698939/3_sry7wf.webp",
  }
];


const HeroSlider = () => {
  return (
    <div className="geh-hero-slider">
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
              <img src={slide.imageUrl}/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
