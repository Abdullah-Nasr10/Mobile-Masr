import React, { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { MdOutlineBatteryChargingFull as BatteryIcon } from "react-icons/md";
import { FaFacebook, FaHeart, FaShareAlt, FaWhatsapp } from "react-icons/fa";
import "./ProductImages.css";
function ProductImages({ product }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const simText = product?.simCard || "";
  const simCount = /2[-\s]?sim/i.test(simText) ? "2" : "";
  return (
    <>
      <div className="abd-product-main-image center">
        <img src={selectedImage || product.images[0]} alt={product.name} />

        {/* --------------sim - card logic -------------- */}
        {simCount && (
          <div className="abd-simCard" title={simText}>
            {simCount}
          </div>
        )}

        {/* --------------product-condition -------------- */}
        <div
          className={`abd-prodType ${
            product.condition.toLowerCase() == "new"
              ? "bg-warning"
              : "bg-primary"
          }`}
        >
          {product.condition}
        </div>

        {/* -----------product-guarantee----------- */}
        <div className="abd-prodGuarantee center">{product.guarantee}</div>

        {/* ----------product-batteryStatus----------- */}
        {product.batteryStatus && (
          <div className="abd-BatteryStatus">
            <BatteryIcon size={18} /> {product.batteryStatus}
          </div>
        )}

        {/* -------product-discount-------- */}
        {product.discount > 0 && (
          <div className="abd-prodDiscount center">-{product.discount}%</div>
        )}

        {/* =============Product-Icons-Start ============ */}
        <div className="abd-ProdIcons fs-3">
          {/* -------------- Heart-Icon --------------- */}
          <div
            className="abd-ProdIcon center"
            style={{
              backgroundColor: isFav ? "var(--red-color-light)" : "",
            }}
            onClick={() => setIsFav(!isFav)}
          >
            <FaHeart
              className={`abd-ProdFavoriteIcon ${isFav ? "text-danger" : ""}`}
            />
          </div>
          {/* -------------- Share-Icon -------------- */}
          <div
            className="abd-ProdIcon center position-relative "
            onClick={() => setShowShareOptions(!showShareOptions)}
          >
            <FaShareAlt className="abd-ProdShareIcon" />
            <div
              className={`abd-ProdShareOptions ${
                showShareOptions ? "d-block" : "d-none"
              }`}
            >
              <FaWhatsapp className="abd-ProdWhatsappIcon" />
              <FaFacebook className="abd-ProdFacebookIcon" />
            </div>
          </div>
        </div>
        {/* =============Product-Icons-End ============ */}
      </div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={8}
        allowTouchMove={true}
        simulateTouch={true}
        // ensure autoplay/loop/navigation are disabled so user must swipe manually
        autoplay={false}
        loop={false}
        className="abd-product-thumbnails-container  my-3 py-3 px-2"
      >
        {product.images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className={`abd-product-thumbnail center${
                selectedImage === img ? " selected" : ""
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <img src={img} alt={`${product.name}-${index}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default ProductImages;
