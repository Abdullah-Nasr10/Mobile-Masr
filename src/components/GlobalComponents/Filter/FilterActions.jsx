import React from "react";
import { FiRotateCcw } from "react-icons/fi";

const FilterActions = ({ onApply, onClear }) => {
  return (
    <div className="mos-filter-panel__actions">
      <button type="button" className="mos-btn-apply" onClick={onApply}>
        Search
      </button>
      <button type="button" className="mos-btn-clear" onClick={onClear}>
        <FiRotateCcw />
        <span>Clear</span>
      </button>
    </div>
  );
};

export default FilterActions;
