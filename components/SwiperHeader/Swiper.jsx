
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const swiper = () => {
  return (
    <div className="container">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ dynamicBullets: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://static.mobilemasr.com/public/settings/banners/68cd88d208d7f_1758300370.webp"
            alt="Slide 1"
            className="w-100"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://static.mobilemasr.com/public/settings/banners/68cd88d232710_1758300370.webp"
            alt="Slide 2"
            className="w-100"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://static.mobilemasr.com/public/settings/banners/68cd88d24e72b_1758300370.webp"
            alt="Slide 3"
            className="w-100"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default swiper;
