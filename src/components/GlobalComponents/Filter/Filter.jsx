import React, { useState, useCallback } from "react";
import {
  FiSliders,
  FiChevronDown,
  FiChevronRight,
  FiRotateCcw,
} from "react-icons/fi";
import "./Filter.css";


const FILTER_GROUPS = {
  Brands: [
    "Apple",
    "Oppo",
    "Realme",
    "Samsung",
    "Hwawei",
    "Honor",
    "Xiaomi",
    "Infinix",
    "Nokia",
    "Lenovo",
    "Vivo",
    "Oneplus",
    "itel",
    "Google",
    "ZTE",
    "Nothing",
    "Motorola",
  ],
  Type: ["New", "Used"],
  "Sim Card": ["1 sim", "2-sim", "1 sim + e sim"],
  Ram: ["3 GB", "4 GB", "6 GB", "8 GB", "12 GB", "16 GB", "36 GB", "64 GB"],
  Storage: ["32 GB", "64 GB", "128 GB", "256 GB", "512 GB", "1 TB"],
  Color: [
    "Mystic Black",
    "Crystal Black",
    "Orange",
    "Silver",
    "Gold",
    "Yellow",
    "Brown",
    "Pink",
    "Purple",
    "Cream",
    "Dark Gray",
    "Midnight Black",
    "Titanium Silver",
    "Starry Black",
    "Mint Green",
    "Sunrise Gold",
    "Carbon Black",
    "Flowing Silver",
    "Sea Blue",
    "Graphite",
    "Space Black",
    "Navy",
    "Lavender",
    "Titanium",
    "Misty Pink",
    "Ice Blue",
    "Navy Blue",
    "Sky Silver",
    "Ocean Blue",
    "Light Green",
    "Moonlight White",
    "Titanium Violet",
    "Titanium Gray",
    "Titanium Blue",
    "Titanium Black",
    "Cobalt Violet",
    "Amber Yellow",
    "Natural Titanium",
    "White Titanium",
    "Starlight",
    "Sierra Blue",
    "Space Gray",
    "Iron Gray",
    "Midnight",
    "Cyclone Black",
    "Waving Aqua",
    "Voyager Black",
    "Razor Green",
    "Silver Shadow",
    "Mint",
    "Charcoal",
    "Stainless Steel",
    "Isle Blue",
    "Dark Green",
    "Lavender Purple",
    "Desert Gold",
    "Sandy Gold",
    "Ultramarine",
    "Desert Titanium",
    "Silver Frost",
    "Ocean Cyan",
    "Jet Black",
    "Monet Gold",
    "Deep Purple",
    "Icy Blue",
    "Midnight Green",
    "Luminous Blue",
    "Skyline Blue",
    "Pearl White",
    "Plume White",
    "Awesome Navy",
    "Awesome White",
    "Suede Gray",
    "Suede Grey",
    "Awesome Light Gray",
    "Meteor Silver",
    "Luna Grey",
    "Sky Blue",
    "Mercurial Silver",
    "Cosmic Orange",
    "Luminous Green",
    "Pantone Amazonite",
    "Pantone Slipstream",
    "Black",
    "Red",
    "White",
    "Blue",
    "Grey",
    "Phantom Black",
    "Phantom Green",
    "Phantom Silver",
    "Violet",
    "Light Violet",
    "Green",
    "Metallic Blue",
    "Mystic Bronze",
  ],
};

// Price boundaries 
const MIN_PRICE = 950;
const MAX_PRICE = 199000;

const FilterSidebar = ({ onApply }) => {
  // Track opened accordion sections
  const [openKeys, setOpenKeys] = useState(() => new Set());
  // Track selected checkbox values per group
  const [selected, setSelected] = useState(() => ({}));
  // Track price range
  const [price, setPrice] = useState([MIN_PRICE, MAX_PRICE]);

  const toggleOpen = (key) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const toggleValue = (group, value) => {
    setSelected((prev) => {
      const next = { ...prev };
      const current = new Set(next[group] || []);
      current.has(value) ? current.delete(value) : current.add(value);
      next[group] = Array.from(current);
      return next;
    });
  };

  const handlePriceInput = (index, raw) => {
    const val = Math.max(MIN_PRICE, Math.min(MAX_PRICE, Number(raw)));
    setPrice((p) => {
      const next = [...p];
      next[index] = index === 0 ? Math.min(val, p[1]) : Math.max(val, p[0]);
      return next;
    });
  };

  // Double range slider logic
  const handleRangeChange = (index, e) =>
    handlePriceInput(index, e.target.value);

  const clearAll = () => {
    setSelected({});
    setPrice([MIN_PRICE, MAX_PRICE]);
    if (onApply) onApply({ filters: {}, price: [MIN_PRICE, MAX_PRICE] });
  };

  const applyFilters = useCallback(() => {
    const payload = { filters: selected, price };
    if (onApply) onApply(payload);
  }, [selected, price, onApply]);

  return (
    <aside className="mos-filter-panel">
      <div className="mos-filter-panel__header">
        <FiSliders className="mos-filter-panel__icon" />
        <span>Filter</span>
      </div>

      <div className="mos-filter-panel__groups">
        {Object.entries(FILTER_GROUPS).map(([group, options]) => {
          const isOpen = openKeys.has(group);
          return (
            <div key={group} className="mos-filter-group">
              <button
                type="button"
                className="mos-filter-group__toggle"
                onClick={() => toggleOpen(group)}
              >
                <span className="mos-filter-group__title">{group}</span>
                {selected[group]?.length ? (
                  <span className="mos-filter-group__count">
                    {selected[group].length}
                  </span>
                ) : null}
                <span className="mos-filter-group__arrow">
                  {isOpen ? <FiChevronDown /> : <FiChevronRight />}
                </span>
              </button>
              {isOpen && (
                <div
                  className="mos-filter-group__body is-list"
                  style={{ maxHeight: (group === 'Color' && 240) || (group === 'Ram' && 200) || 150 }}
                >
                  {options.map((opt) => {
                    const checked = selected[group]?.includes(opt);
                    return (
                      <label key={opt} className="mos-filter-check">
                        <input
                          type="checkbox"
                          checked={!!checked}
                          onChange={() => toggleValue(group, opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

      

        <div className="mos-filter-group">
          <button
            type="button"
            className="mos-filter-group__toggle"
            onClick={() => toggleOpen("Price")}
          >
            <span className="mos-filter-group__title">Price</span>
            <span className="mos-filter-group__count">
              {price[0].toLocaleString()} - {price[1].toLocaleString()}
            </span>
            <span className="mos-filter-group__arrow">
              {openKeys.has("Price") ? <FiChevronDown /> : <FiChevronRight />}
            </span>
          </button>
          {openKeys.has("Price") && (
            <div className="mos-filter-group__body no-scroll">
              <div className="mos-price-inputs">
                <input
                  type="number"
                  value={price[0]}
                  onChange={(e) => handlePriceInput(0, e.target.value)}
                />
                <span className="mos-price-dash">–</span>
                <input
                  type="number"
                  value={price[1]}
                  onChange={(e) => handlePriceInput(1, e.target.value)}
                />
              </div>
              <div className="mos-double-range">
                <input
                  type="range"
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  value={price[0]}
                  onChange={(e) => handleRangeChange(0, e)}
                />
                <input
                  type="range"
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  value={price[1]}
                  onChange={(e) => handleRangeChange(1, e)}
                />
                <div className="mos-double-range__track" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mos-filter-panel__actions">
        <button type="button" className="mos-btn-apply" onClick={applyFilters}>
          Search
        </button>
        <button type="button" className="mos-btn-clear" onClick={clearAll}>
          <FiRotateCcw />
          <span>Clear</span>
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
