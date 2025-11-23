import React from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { colorMap } from "./FilterData";

const FilterGroup = ({ group, options, isOpen, selected, onToggleOpen, onToggleValue }) => {
  return (
    <div className="mos-filter-group">
      <button
        type="button"
        className="mos-filter-group__toggle"
        onClick={onToggleOpen}
      >
        <span className="mos-filter-group__title">{group}</span>
        {selected?.length ? (
          <span className="mos-filter-group__count">{selected.length}</span>
        ) : null}
        <span className="mos-filter-group__arrow">
          {isOpen ? <FiChevronDown /> : <FiChevronRight />}
        </span>
      </button>
      {isOpen && (
        <div
          className="mos-filter-group__body is-list"
          style={{
            maxHeight:
              (group === "Color" && 240) ||
              (group === "Ram" && 200) ||
              150,
          }}
        >
          {options.map((opt) => {
            const checked = selected?.includes(opt);
            const isColorGroup = group === "Color";
            const colorValue = colorMap[opt.toLowerCase()] || "#808080";

            return (
              <label
                key={opt}
                className={`mos-filter-check ${
                  isColorGroup ? "mos-filter-color" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!checked}
                  onChange={() => onToggleValue(opt)}
                />
                {isColorGroup && (
                  <span
                    className="mos-color-circle"
                    style={{
                      backgroundColor: colorValue,
                      border:
                        colorValue === "#FFFFFF"
                          ? "1px solid #ddd"
                          : "none",
                    }}
                  />
                )}
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterGroup;
