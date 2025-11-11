import { useState } from "react";
import "./ToggleLanguage.css";
function ToggleLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const handleLanguageChange = () => {
    setSelectedLanguage((prev) => (prev === "EN" ? "AR" : "EN"));
  };
  return (
    <div
      className={`abd-ToggleLanguage ${
        selectedLanguage === "AR" ? "active" : ""
      }`}
      onClick={handleLanguageChange}
    >
      <div
        className={`language-option ${
          selectedLanguage === "EN" ? "active" : ""
        }`}
      >
        EN
      </div>
      <div
        className={`language-option ${
          selectedLanguage === "AR" ? "active" : ""
        }`}
      >
        AR
      </div>
    </div>
  );
}

export default ToggleLanguage;
