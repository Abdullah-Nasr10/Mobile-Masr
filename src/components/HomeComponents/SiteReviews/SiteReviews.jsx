import ReviewCard from "./ReviewCard";
import "./SiteReviews.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Button from "../../GlobalComponents/Button/Button";
import { Link } from "react-router-dom";

export default function MobileReviewsStatic() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:3000/reviews");
        setReviews(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviews();
  }, []);
  return (
    <>
      <div className="container mb-5 d-flex justify-content-between align-items-center">
        <h2 className="fw-light site-reviews-title">Reviews</h2>
        <Link to="/review">
          <Button btnTitle="Add Review" btnColor="var(--orange-color)" />
        </Link>
      </div>
      <Swiper
        className="site-reviews-swiper container px-5 pt-4"
        modules={[Pagination, Autoplay]}
        grabCursor={true}
        initialSlide={0}
        slidesPerView={3}
        slideToClickedSlide={true}
        pagination={{ clickable: true }}
        spaceBetween={24}
        style={{ overflow: "hidden", padding: "3rem 0" }}
        loop={reviews.length > 3}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1 },
          580: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="swiper-slide">
            <ReviewCard
              name={review.name}
              comment={review.comment}
              rating={review.rating}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

// <div
//   className="d-flex justify-content-center flex-wrap gap-5 mt-5"
//   style={{ width: "100%" }}
// >
//   {reviews.map((review) => (
//     <ReviewCard
//       key={review.id}
//       name={review.name}
//       comment={review.comment}
//       rating={review.rating}
//     />
//   ))}
// </div>
