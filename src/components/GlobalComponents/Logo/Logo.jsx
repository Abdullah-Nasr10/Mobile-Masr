import { AiOutlineDingding } from "react-icons/ai";
// import { DiPhonegap } from "react-icons/di";
import "./Logo.css";
function Logo() {
  return (
    <div className="abd-Logo fw-bolder d-flex align-items-center">
      <AiOutlineDingding className="abd-LogoIcon" />
      HGRA<span className="m-char">M</span>
    </div>
  );
}

export default Logo;
