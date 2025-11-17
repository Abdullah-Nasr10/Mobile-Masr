import React from "react";
import FilterSidebar from "../../GlobalComponents/Filter/Filter";
import MobileSortSection from "../MobileSortSection/MobileSortSection";
import "./MobileFilterSidebar.css";

function MobileFilterSidebar({
  show,
  onClose,
  sortBy,
  onSortChange,
  category,
  onFilterApply,
  availableProducts,
  selectedBrandFromCarousel,
  currentFilters,
  onClearAll,
}) {
  if (!show) return null;

  const handleSortChange = (val) => {
    onSortChange(val);
    onClose();
  };

  const handleFilterApply = (data) => {
    onFilterApply(data);
    onClose();
  };

  const handleClearAll = () => {
    onClearAll();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="mos-mobile-overlay" onClick={onClose} />

      {/* Sidebar */}
      <div className="mos-mobile-sidebar">
        {/* Header */}
        <div className="mos-mobile-sidebar-header">
          <h3 className="mb-0">Filter & Sort</h3>
          <button className="mos-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Content */}
        <div className="mos-mobile-sidebar-content">
          {/* Sort Section */}
          <MobileSortSection sortBy={sortBy} onSortChange={handleSortChange} />

          {/* Filter Section */}
          <FilterSidebar
            category={category}
            onApply={handleFilterApply}
            availableProducts={availableProducts}
            selectedBrandFromCarousel={selectedBrandFromCarousel}
            currentFilters={currentFilters}
            onClearAll={handleClearAll}
          />
        </div>
      </div>
    </>
  );
}

export default MobileFilterSidebar;
