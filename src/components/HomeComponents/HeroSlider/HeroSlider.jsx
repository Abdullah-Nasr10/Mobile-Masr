import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./HeroSlider.css";
import { useSelector } from "react-redux";

const slides = [
  {
    en: "https://res.cloudinary.com/dj1omur11/image/upload/v1766781700/HeroSlider1_njn5af.jpg",
    ar: "https://res.cloudinary.com/dj1omur11/image/upload/v1766781700/HeroSlider1_njn5af.jpg", // عدل هذا لاحقًا
  },
  {
    en: "https://res.cloudinary.com/dj1omur11/image/upload/v1766777928/HeroSlider2.1_iarmdz.png",
    ar: "https://res.cloudinary.com/dj1omur11/image/upload/v1767214641/HeroSlider2.2_1_evei64.png", // عدل هذا لاحقًا
  },
  {
    en: "https://res.cloudinary.com/dj1omur11/image/upload/v1766780241/HeroSlider3.1_knaqm9.jpg",
    ar: "https://res.cloudinary.com/dj1omur11/image/upload/v1766780241/HeroSlider3.1_knaqm9.jpg", // عدل هذا لاحقًا
  },
  {
    en: "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762698939/5_xfim4d.webp",
    ar: "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762698939/5_xfim4d.webp", // عدل هذا لاحقًا
  },
  {
    en: "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762698939/3_sry7wf.webp",
    ar: "https://res.cloudinary.com/dfigu6nnn/image/upload/v1762698939/3_sry7wf.webp", // عدل هذا لاحقًا
  },
];

const HeroSlider = () => {
  const currentLang = useSelector((state) => state.language.currentLang);
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
                <img
                  src={slide[currentLang] || slide.en}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSlider;
