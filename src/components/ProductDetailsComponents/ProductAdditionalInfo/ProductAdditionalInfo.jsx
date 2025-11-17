import "./ProductAdditionalInfo.css";
import { GoShieldCheck } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { BsClipboard2Pulse } from "react-icons/bs";

function AdditionalInfoItem({ icon, title, description }) {
  return (
    <div
      className="abd-additionalInfoItem d-flex gap-2 p-4 mb-3"
      style={{
        color: "var(--green-color)",
        backgroundColor: "var(--green-color-light)",
        border: "1px solid var(--green-color)",
        borderRadius: "0.5rem",
      }}
    >
      <div className="center">{icon}</div>
      <div>
        <div className="fw-semibold fs-4">{title}</div>
        <div className="abd-additionalInfoDesc fs-5">{description}</div>
      </div>
    </div>
  );
}

function ProductAdditionalInfo({ product }) {
  return (
    <>
      <AdditionalInfoItem
        icon={<GoShieldCheck size={40} />}
        title={"Guaranteed Sellers & Buyers"}
        description={"Secure Platform for your info and cards"}
      />

      <AdditionalInfoItem
        icon={<BiLike size={40} />}
        title={product?.guarantee || "Warranty"}
        description={"Buy with warranty from Verified Stores"}
      />

      <AdditionalInfoItem
        icon={<BsClipboard2Pulse size={40} />}
        title={"Diagnostic Tool Report"}
        description={"Generate a diagnostic report for your device"}
      />
    </>
  );
}

export default ProductAdditionalInfo;
