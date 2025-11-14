import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Card from "../../GlobalComponents/Card/Card.jsx";
import "./ProductsSlider.css";
import { NavLink } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";

const ProductsSlider = ({ title, products }) => {
  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-content-center mb-5">
        <h2 className="abd-ProductsSlider-title mb-3 fw-light">{title}</h2>
        <NavLink to="/products" className="abd-ProductsSlider-see-more center">
          see more <MdArrowForwardIos />
        </NavLink>
      </div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={products.length > 4}
        breakpoints={{
          0: { slidesPerView: 1 },
          450: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        className="py-4 px-5"
      >
        {products.map((p, index) => (
          <SwiperSlide key={index}>
            <Card product={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
