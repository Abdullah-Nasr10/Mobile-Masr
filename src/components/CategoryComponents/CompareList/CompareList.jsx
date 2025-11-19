import React from "react";
import { IoGitCompareOutline } from "react-icons/io5";
import "./CompareList.css";
function CompareList() {
  const [showCompareList, setShowCompareList] = React.useState(false);
  return (
    <>
      <div className="abd-compareList">
        <div
          className="abd-compareListBtn d-flex align-items-center gap-2 "
          onClick={() => setShowCompareList(!showCompareList)}
        >
          <IoGitCompareOutline />
          <div>compare</div>
          <div className="abd-numOfCompared center">0</div>
        </div>
        {/* ===============compare-list-items=============== */}
        <div
          className={`abd-compareListItems${showCompareList ? " show" : ""}`}
        >
          <div className="abd-compareListItem d-flex align-items-center gap-3 p-3">
            <img
              src="https://m.media-amazon.com/images/I/61jLiCov3SL._AC_UY218_.jpg"
              alt="product"
            />
            <div className="abd-compareItemInfo">Product Name</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompareList;
