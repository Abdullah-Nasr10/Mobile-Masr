import React, { useState, useCallback, useEffect } from "react";
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
  SSD : ["128 GB", "256 GB", "512 GB", "1 TB"],
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
const MIN_PRICE = 1380;
const MAX_PRICE = 199000;

const FilterSidebar = ({ onApply, category, availableProducts = [], selectedBrandFromCarousel = null, currentFilters = {}, onClearAll }) => {
  // Track opened accordion sections
  const [openKeys, setOpenKeys] = useState(() => new Set());
  // Track selected checkbox values per group
  const [selected, setSelected] = useState(() => ({}));
  // Track price range
  const [price, setPrice] = useState([MIN_PRICE, MAX_PRICE]);

  // Reset accordion state when category changes
  useEffect(() => {
    setOpenKeys(new Set()); // close all accordions
  }, [category]);

  // Color mapping for visual display
  const colorMap = {
    black: '#000000',
    red: '#FF0000',
    white: '#FFFFFF',
    gold: '#FFD700',
    blue: '#0000FF',
    'phantom black': '#000000',
    'phantom green': '#2D5016',
    'phantom silver': '#C0C0C0',
    silver: '#C0C0C0',
    yellow: '#FFFF00',
    brown: '#8B4513',
    pink: '#FFC0CB',
    purple: '#800080',
    cream: '#FFFDD0',
    'dark gray': '#A9A9A9',
    'midnight black': '#000000',
    orange: '#FFA500',
    green: '#008000',
    'navy blue': '#000080',
    gray: '#808080',
    grey: '#808080',
  };

  // Sync with brand selected from carousel
  useEffect(() => {
    if (selectedBrandFromCarousel) {
      // Find brand name from ID
      const product = availableProducts.find(p => {
        const brandId = typeof p.brand === 'object' ? p.brand._id : null;
        return brandId === selectedBrandFromCarousel;
      });
      if (product) {
        const brandName = typeof product.brand === 'object' ? product.brand.name : product.brand;
        setSelected(prev => ({
          ...prev,
          Brands: [brandName]
        }));
      }
    } else if (currentFilters.brands?.length === 0) {
      // Clear brand selection if no carousel brand selected
      setSelected(prev => {
        const newSelected = { ...prev };
        delete newSelected.Brands;
        return newSelected;
      });
    }
  }, [selectedBrandFromCarousel, availableProducts, currentFilters.brands]);

  // Extract unique brands from available products
  const getAvailableBrands = () => {
    const brandsSet = new Set();
    availableProducts.forEach(product => {
      if (product.brand) {
        const brandName = typeof product.brand === 'object' ? product.brand.name : product.brand;
        if (brandName) brandsSet.add(brandName);
      }
    });
    return Array.from(brandsSet).sort();
  };

  // Define which filters to show per category
  const getFilterGroups = () => {
    const normalizedCategory = category?.toLowerCase().replace(/-/g, " ") || "";
    const availableBrands = getAvailableBrands();
    
    // Common filters for all categories
    const commonFilters = {
      "Brands": availableBrands.length > 0 ? availableBrands : FILTER_GROUPS.Brands,
      "Type": FILTER_GROUPS.Type,
    };

    // Category-specific filters
    if (normalizedCategory.includes("mobile") || normalizedCategory.includes("phone")) {
      return {
        ...commonFilters,
        "Sim Card": FILTER_GROUPS["Sim Card"],
        "Ram": FILTER_GROUPS.Ram,
        "Storage": FILTER_GROUPS.Storage,
        "Color": FILTER_GROUPS.Color,
      };
    }
    
    if (normalizedCategory.includes("laptop")) {
      return {
        ...commonFilters,
        "SSD": FILTER_GROUPS.SSD,
        "Ram": FILTER_GROUPS.Ram,
        "Color": FILTER_GROUPS.Color,
      };
    }
    
    if (normalizedCategory.includes("tablet")) {
      return {
        ...commonFilters,
        "Sim Card": FILTER_GROUPS["Sim Card"],
        "Ram": FILTER_GROUPS.Ram,
        "Storage": FILTER_GROUPS.Storage,
        "Color": FILTER_GROUPS.Color,
      };
    }
    
    if (normalizedCategory.includes("watch")) {
      return {
        ...commonFilters,
        "Sim Card": FILTER_GROUPS["Sim Card"],
        "Color": FILTER_GROUPS.Color,
      };
    }
    
    if (normalizedCategory.includes("earbuds") || normalizedCategory.includes("headphone")) {
      return {
        ...commonFilters,
        "Color": FILTER_GROUPS.Color,
      };
    }
    
    if (normalizedCategory.includes("console") || normalizedCategory.includes("playstation") || normalizedCategory.includes("xbox")) {
      return {
        ...commonFilters,
        "Color": FILTER_GROUPS.Color,
      };
    }

    // Default: show common filters only
    return commonFilters;
  };

  const availableFilters = getFilterGroups();

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
    if (onClearAll) {
      onClearAll();
    } else if (onApply) {
      onApply({ filters: {}, price: [MIN_PRICE, MAX_PRICE] });
    }
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
        {Object.entries(availableFilters).map(([group, options]) => {
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
                    const isColorGroup = group === 'Color';
                    const colorValue = colorMap[opt.toLowerCase()] || '#808080';
                    
                    return (
                      <label key={opt} className={`mos-filter-check ${isColorGroup ? 'mos-filter-color' : ''}`}>
                        <input
                          type="checkbox"
                          checked={!!checked}
                          onChange={() => toggleValue(group, opt)}
                        />
                        {isColorGroup && (
                          <span 
                            className="mos-color-circle" 
                            style={{ 
                              backgroundColor: colorValue,
                              border: colorValue === '#FFFFFF' ? '1px solid #ddd' : 'none'
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
        <div
          className="mos-double-range__track"
          style={{
            background: `linear-gradient(
              to right,
              #d1d5db ${((price[0] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%,
              #16a34a ${((price[0] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%,
              #16a34a ${((price[1] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%,
              #d1d5db ${((price[1] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%
            )`,
          }}
        />
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
