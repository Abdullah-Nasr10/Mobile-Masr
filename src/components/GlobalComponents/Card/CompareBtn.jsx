import React from "react";
import { IoGitCompareOutline } from "react-icons/io5";
import "./Card.css";
function CompareBtn() {
  return (
    <div className="abd-CompareBtn p-2">
      <IoGitCompareOutline size={20} />
      <div className="abd-TextCompareBtn ms-2">Compare</div>
    </div>
  );
}

export default CompareBtn;
