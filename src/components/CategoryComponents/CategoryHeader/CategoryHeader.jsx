import React from "react";
import Sort from "../../GlobalComponents/Sort/Sort";
import { FiSliders } from "react-icons/fi";
import "./CategoryHeader.css";
import { useTranslation } from "react-i18next";

function CategoryHeader({
  category,
  sortBy,
  onSortChange,
  onMobileFilterClick,
}) {
  const { t } = useTranslation();
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="d-md-none mb-3">
        <button className="mos-mobile-filter-btn" onClick={onMobileFilterClick}>
          <FiSliders size={18} /> {t("Filter & Sort")}
        </button>
      </div>

      {/* Category Header with Sort - Hide title on mobile */}
      <div className="mos-category-header mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="d-none d-md-block">
            <h2 className="mos-category-title text-capitalize mb-0">
              {category?.replace(/-/g, " ")}
            </h2>
          </div>

          {/* Sort Dropdown - Desktop Only */}
          <div className="d-none d-md-block ms-auto">
            <Sort sortBy={sortBy} onSortChange={onSortChange} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryHeader;
