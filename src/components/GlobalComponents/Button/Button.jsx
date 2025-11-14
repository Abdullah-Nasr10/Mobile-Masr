import React from "react";
import "./Button.css";

const Button = ({ btnTitle, btnColor = "var(--orange-color)" }) => {
  return (
    <button className="button" style={{ "--button-color": btnColor }}>
      {btnTitle}
    </button>
  );
};

export default Button;
