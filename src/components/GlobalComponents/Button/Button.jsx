import React from "react";
import "./Button.css";

const Button = ({ btnTitle, btnColor }) => {
  return (
    <button className="button" style={{ "--button-color": btnColor }}>
      {btnTitle}
    </button>
  );
};

export default Button;
