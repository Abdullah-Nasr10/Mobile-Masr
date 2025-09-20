import React from "react";
import { FaFacebookF, FaRegUser } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerSectionHome.css";

function CustomerSectionhome() {
  const reviews = [
    {
      name: "Abdullah Nasr",
      date: "June 25, 2025",
      text: "من النادر تثق في حد في سوق الموبايلات المستعمله لكن انا كان حظي حلو اني اتعاملت مع موبايل مصر مش بس ان الموبايل وصل بعد ما اشتريته بيوم وان",
    },
    {
      name: "Asmaa Ahmed",
      date: "May 15, 2025",
      text: "شركة محترمة جدا الطلب جالي خلال يومين زي ما في الصورة بالضبط ونفس الحالة الممتازة ومتابعة بعد البيع ناس أصحاب ذوق وصداقية",
    },
    {
      name: "Mustafa Mahmoud",
      date: "November 26, 2025",
      text: "بصراحة مبسوط جدا من التجربة دي، ان الواحد مش سهل يشتري حاجة بقيمة مستعملة من غير ما يشوفها، فالموقع بصراحة ساعدني اعرف حالة المنتج الي ب",    
    },
    {
      name: "Eng-Gehad Sweeney",
      date: "July 1, 2025",
      text: "Awesome products, amazing quality in used products and the team follows up with you to check if everything is okay so amazing customer service.",
    },
    {
      name: "Rehab Ahmed",
      date: "October 15, 2025",
      text: "ناس في منتهي المصداقية اشتريت منهم تلفون هونر مستعمل مفيش فرق بينه وبين الجديد والله بكلم بجد والميعاد بتاع التسليم في ميعاده❤️❤️",    
    },
    {
      name: "ُAhmed Elsayeh",
      date: "September 23, 2025",
      text: "شركه ف غايه الاحترام والذوق ف التعامل وكمان متابعه ما بعد البيع وحقيقي واحده من افضل الشركات من حيث المصداقية وسرعه التنفيذ ويارب  ف نجاح وتقدم دايما",
    },
  ];

  return (
    <section className="mos-customer-section container py-5">
      <div className="reviews mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mos-section-title mb-0">
            <a className="me-2"><FaFacebookF size="2.5rem" /></a> 
            <span>Customer</span> Reviews
          </h3>
          <a href="#!" className="mos-see-all">
            See All  &rarr;
          </a>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          autoplay={{ delay: 2000 }}
          loop={true}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="card mos-review-card shadow-sm p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center gap-4 mb-2">
                    <FaRegUser size={24} color="var(--orange-color)" />
                    <div>
                      <p className="mb-0 fw-bold fs-5">{review.name}</p>
                      <small className="text-muted fs-6">{review.date}</small>
                    </div>
                  </div>
                  <FaFacebookF size={20} color="#1877F2" />
                </div>
                <p className="mb-0 mos-review-text">{review.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default CustomerSectionhome;
