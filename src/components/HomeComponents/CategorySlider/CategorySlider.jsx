import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import axios from "axios";
import "./CategorySlider.css";
import { Link } from "react-router-dom";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);

  const CatName = ["mobile", "tablet", "smart-watches", "wireless-earbuds", "game-consoles","laptop"];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="geh-category-slider container">
<Swiper
  modules={[Autoplay]}
  autoplay={{ delay: 2000, disableOnInteraction: false }}
  spaceBetween={32} 
  slidesPerView={6}
  breakpoints={{
    320: { 
      slidesPerView: 2,
      spaceBetween: 10
    },
    480: { 
      slidesPerView: 3,
      spaceBetween: 20
    },
    768: { 
      slidesPerView: 4,
      spaceBetween: 22 
    },
    1024: { 
      slidesPerView: 4,
      
    },
    1280: { 
      slidesPerView: 6,
      spaceBetween: 32
    },
  }}
>

        {categories.map((cat, index) => (
          <SwiperSlide key={cat._id}>
            <Link to={`/category/${CatName[index]}`} className="geh-category-card">
              <div className="geh-image-box">
                <img src={cat.image} alt={cat.name} />
              </div>
              <span className="geh-title">{cat.name}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;



