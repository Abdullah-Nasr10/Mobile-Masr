import React from "react";
import "./Home.css";
import { products } from "../../components/ApiProducts/Apiproducts.js";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
function Home() {
  const items = [
    {
      id: 1,
      title: "Mobile Phone",
      img: "https://static.mobilemasr.com/public/categories/683d9cfd3e58f_1748868349.webp",
      href: "https://example.com/mobile",
    },
    {
      id: 2,
      title: "Tablet",
      img: "https://static.mobilemasr.com/public/categories/683d9cf256d52_1748868338.webp",
      href: "https://example.com/tablet",
    },
    {
      id: 3,
      title: "Smart watches",
      img: "https://static.mobilemasr.com/public/categories/683d9ce6ecda7_1748868326.webp",
      href: "https://example.com/watch",
    },
    {
      id: 4,
      title: "Wireless Earbuds",
      img: "https://static.mobilemasr.com/public/categories/683d9cdb5a56d_1748868315.webp",
      href: "https://example.com/earbuds",
    },
    {
      id: 5,
      title: "Game Consoles",
      img: "https://static.mobilemasr.com/public/categories/683d9cd308f81_1748868307.webp",
      href: "https://example.com/console",
    },
    {
      id: 6,
      title: "Laptop",
      img: "https://static.mobilemasr.com/public/categories/683d9cc4c1307_1748868292.webp",
      href: "https://example.com/laptop",
    },
  ];
  const geh_newProducts = products.filter((p) => p.status === "New");
  const geh_usedProducts = products.filter((p) => p.status === "Used");

  return (
    <>
      {/* =================================================== */}
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
              class="w-100"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://static.mobilemasr.com/public/settings/banners/68cd88d232710_1758300370.webp"
              alt="Slide 2 "
              class="w-100"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://static.mobilemasr.com/public/settings/banners/68cd88d24e72b_1758300370.webp"
              alt="Slide 3 "
              class="w-100"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      {/*icon header  */}
      <div
        className="container my-4 d-flex gap-3 p-3"
        style={{
          width: "1400px",
          minHeight: "30px",
          border: "2px solid #f5f2f2ff",
          backgroundColor: "#fff",
        }}
      >
        <div className="card p-2 flex-fill">
          <div className="d-flex align-items-center">
            <img
              src="https://mobilemasr.com/_ipx/_/Images/feature/diagnostic_tool_new.svg"
              alt="icon"
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",

                padding: "3px",
              }}
            />
            <div>
              <p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
                Diagnostic Tool Report
              </p>
              <p className="mb-0" style={{ fontSize: "11px" }}>
                Generate a diagnostic report for your device
              </p>
            </div>
          </div>
        </div>

        <div
          className="card p-2 flex-fill"
          style={{ borderLeft: "1px solid #fff" }}
        >
          <div className="d-flex align-items-center">
            <img
              src="https://mobilemasr.com/_ipx/_/Images/feature/secure_selling_new.svg"
              alt="icon"
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",

                padding: "3px",
              }}
            />
            <div>
              <p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
                Guaranteed Sellers & Buyers
              </p>
              <p className="mb-0" style={{ fontSize: "11px" }}>
                Secure Platform for your info and cards
              </p>
            </div>
          </div>
        </div>

        <div
          className="card p-2 flex-fill"
          style={{ borderLeft: "1px solid #fff" }}
        >
          <div className="d-flex align-items-center">
            <img
              src="https://mobilemasr.com/_ipx/_/Images/feature/warranty_30_day_new.svg"
              alt="icon"
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",

                padding: "3px",
              }}
            />
            <div>
              <p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
                30 days warranty
              </p>
              <p className="mb-0" style={{ fontSize: "11px" }}>
                Buy with warranty from Verified Stores
              </p>
            </div>
          </div>
        </div>

        <div
          className="card p-2 flex-fill"
          style={{ borderLeft: "1px solid #fff" }}
        >
          <div className="d-flex align-items-center">
            <img
              src="https://mobilemasr.com/_ipx/_/Images/feature/fast_delivery_new.svg"
              alt="icon"
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",

                padding: "3px",
              }}
            />
            <div>
              <p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
                Fast Delivery
              </p>
              <p className="mb-0" style={{ fontSize: "11px" }}>
                Safe Delivery to All Governorates
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      <div>
        <div className="heb-categories-container">
          {items.map((it) => (
            <a
              key={it.id}
              href={it.href}
              target="_blank"
              rel="noreferrer"
              className="heb-category-card"
            >
              <div className="heb-image-box">
                <img src={it.img} alt={it.title} />
              </div>
              <span className="heb-title">{it.title}</span>
            </a>
          ))}
        </div>
      </div>
      {/* ================================*/}
      <div className="container mt-5">
        <ProductsSlider title="All Products" products={products} />
        <ProductsSlider title="New Products" products={geh_newProducts} />
        <ProductsSlider title="Used Products" products={geh_usedProducts} />
      </div>
    </>
  );
}

export default Home;
