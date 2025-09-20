import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Cart from "../../Pages/Cart/Cart.jsx";


const ProductsSlider = ({ title, products }) => {
  return (
    <div className="mb-5">
      <h3 className="mb-3">{title}</h3>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={4}
        autoplay={{ delay: 2000 }}
        loop={true}
      >
        {products.map((p, index) => (
          <SwiperSlide key={index}>
            <Cart product={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
