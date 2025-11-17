import React from "react";
import "./ProductInfo.css";
import { FaCircleCheck } from "react-icons/fa6";
import { GiCharging } from "react-icons/gi";
import { BsBoxSeam, BsUsbPlug } from "react-icons/bs";
import { PiDeviceMobileSpeakerLight as MobileCover } from "react-icons/pi";
import { AiOutlineShoppingCart as Cart } from "react-icons/ai";
import { BsEarbuds } from "react-icons/bs";
import VendorContainer from "../../GlobalComponents/VendorContainer/VendorContainer";

function ProductInfo({ product }) {
  return (
    <>
      {/* ===================Category-Name=================== */}
      <div className="abd-InfoCatName mb-3 fs-2 fw-light">
        {product.category.name}
      </div>
      {/* ===================Product-Name=================== */}
      <h2 className="fw-semibold mb-4">{product.name}</h2>
      {/* ===================Product-Price=================== */}
      <div className="abd-InfoPrice d-flex align-items-baseline gap-3 mb-3 fs-3">
        <div
          className="abd-InfoNewPrice"
          style={
            product.discount > 0
              ? {
                  color: "var(--red-color)",
                  backgroundColor: "var(--red-color-light)",
                }
              : {}
          }
        >
          {product.priceAfterDiscount} EGP
        </div>
        {product.discount > 0 && (
          <div className="abd-InfoOldPrice text-muted text-decoration-line-through">
            {product.price} EGP
          </div>
        )}
      </div>
      {/* ===================SKU-Code=================== */}
      <div className="abd-InfoSKU mb-3">
        <span className="fw-semibold me-3">SKU Code: </span> {product.skuCode}
      </div>
      {/* ===================Product-Description=================== */}
      <p className="text-muted fs-4">{product.description}</p>
      {/* ==================Product-Verified=================== */}
      {product.condition == "used" && (
        <div className="abd-InfoVerified mt-4 fs-5 d-flex align-items-center">
          <FaCircleCheck className="me-2 text-success" />
          Checked and Verified By MobileMasr
        </div>
      )}
      {/* ================Prod-Info-Details===================== */}
      <div className="abd-InfoDetails mt-4">
        <div className="abd-InfoDetailItem row mb-3">
          {/* ---------------condition-------------- */}
          <div className="fw-semibold col-4">Condition:</div>
          <div
            className={`col-8 fw-bold ${
              product.condition === "used" ? "text-primary" : "text-warning"
            }`}
          >
            {product.condition}
          </div>
        </div>
        {/* ---------------storage--------------- */}
        {product.storage && (
          <div className="abd-InfoDetailItem row mb-3">
            <div className="fw-semibold col-4">Storage:</div>
            <div className="col-8">{product.storage}</div>
          </div>
        )}
        {/* ---------------ram--------------- */}
        {product.ram[0] && (
          <div className="abd-InfoDetailItem row mb-3">
            <div className="fw-semibold col-4">RAM:</div>
            <div className="col-8">{product.ram[0]}</div>
          </div>
        )}
        {/* ---------------color--------------- */}
        {product.color && (
          <div className="abd-InfoDetailItem row mb-3">
            <div className="fw-semibold col-4">Color:</div>
            <div className="col-8 d-flex align-items-center">
              <span
                className="colorBox p-3"
                style={{ backgroundColor: product.color }}
              ></span>
              {product.color}
            </div>
          </div>
        )}
        {/* -------------Battery Capacity--------------- */}
        {product.batteryCapacity && (
          <div className="abd-InfoDetailItem row mb-3">
            <div className="fw-semibold col-4">Battery Capacity:</div>
            <div className="col-8">{product.batteryCapacity}</div>
          </div>
        )}
        {/* ---------------sim card--------------- */}
        {product.simCard && (
          <div className="abd-InfoDetailItem row mb-3">
            <div className="fw-semibold col-4">SIM Card:</div>
            <div className="col-8">{product.simCard}</div>
          </div>
        )}
        {/* ---------------screen size--------------- */}
        {product.screenSize && (
          <div className="abd-InfoDetailItem row mb-3">
            <div className="fw-semibold col-4">Screen Size:</div>
            <div className="col-8">{product.screenSize}</div>
          </div>
        )}
        {/* ---------------camera--------------- */}
        {product.camera && (
          <div className="abd-InfoDetailItem row mb-3">
            <div className="fw-semibold col-4">Camera:</div>
            <div className="col-8">{product.camera}</div>
          </div>
        )}
        {/* ---------------weight--------------- */}
        {product.weight && (
          <div className="abd-InfoDetailItem row mb-3">
            <div className="fw-semibold col-4">Weight:</div>
            <div className="col-8">{product.weight}</div>
          </div>
        )}
        {/* ---------------SSD--------------- */}
        {product.ssd && (
          <div className="abd-InfoDetailItem row mb-3">
            <div className="fw-semibold col-4">SSD:</div>
            <div className="col-8">{product.ssd}</div>
          </div>
        )}
        {/* ---------------HDD--------------- */}
        {product.hdd && (
          <div className="abd-InfoDetailItem row mb-3">
            <div className="fw-semibold col-4">HDD:</div>
            <div className="col-8">{product.hdd}</div>
          </div>
        )}
        {/* ---------------GPU--------------- */}
        {product.gpu && (
          <div className="abd-InfoDetailItem row mb-3">
            <div className="fw-semibold col-4">GPU:</div>
            <div className="col-8">{product.gpu}</div>
          </div>
        )}
        {/* ---------------processor--------------- */}
        {product.processor && (
          <div className="abd-InfoDetailItem row mb-3">
            <div className="fw-semibold col-4">Processor:</div>
            <div className="col-8">{product.processor}</div>
          </div>
        )}
        {/* ---------------accessories--------------- */}
        {product.accessories && (
          <div className="abd-InfoDetailItem row mb-3">
            <div className="fw-semibold col-4">Accessories:</div>
            <div className="col-8">
              {product.accessories.map((acc, index) => (
                <span key={index} className="me-3 fs-5">
                  <span className="me-2 d-inline-block">
                    {acc.toLowerCase() == "earbuds" ? (
                      <BsEarbuds />
                    ) : acc.toLowerCase() == "charger" ? (
                      <GiCharging />
                    ) : acc.toLowerCase() == "original box" ? (
                      <BsBoxSeam />
                    ) : acc.toLowerCase() == "usb" ? (
                      <BsUsbPlug />
                    ) : acc.toLowerCase() == "mobile cover" ? (
                      <MobileCover />
                    ) : (
                      acc
                    )}
                  </span>
                  {acc}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* =================Product-Vendor=================== */}
      <VendorContainer vendor={product.vendor} />
      {/* ==============Add-To-Cart-Button=================== */}
      <div className="my-5">
        <button className="abd-InfoAddToCartBtn w-100 center gap-3 ">
          <Cart size={20} /> Add to Cart
        </button>
      </div>
    </>
  );
}

export default ProductInfo;
