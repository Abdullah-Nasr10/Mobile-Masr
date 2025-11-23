import React, { useState, useCallback, useEffect } from "react";
import { FiSliders } from "react-icons/fi";
import { MIN_PRICE, MAX_PRICE } from "./FilterData";
import { getFilterGroups, findBrandNameById } from "./FilterUtils";
import FilterGroup from "./FilterGroup";
import PriceFilter from "./PriceFilter";
import FilterActions from "./FilterActions";
import "./Filter.css";

const FilterSidebar = ({
  onApply,
  category,
  availableProducts = [],
  selectedBrandFromCarousel = null,
  currentFilters = {},
  onClearAll,
}) => {
  const [openKeys, setOpenKeys] = useState(() => new Set());
  const [selected, setSelected] = useState(() => ({}));
  const [price, setPrice] = useState([MIN_PRICE, MAX_PRICE]);

  // Reset accordion when category changes
  useEffect(() => {
    setOpenKeys(new Set());
  }, [category]);

  // Sync with brand from carousel
  useEffect(() => {
    if (selectedBrandFromCarousel) {
      const brandName = findBrandNameById(availableProducts, selectedBrandFromCarousel);
      if (brandName) {
        setSelected((prev) => ({ ...prev, Brands: [brandName] }));
      }
    } else if (currentFilters.brands?.length === 0) {
      setSelected((prev) => {
        const newSelected = { ...prev };
        delete newSelected.Brands;
        return newSelected;
      });
    }
  }, [selectedBrandFromCarousel, availableProducts, currentFilters.brands]);

  const availableFilters = getFilterGroups(category, availableProducts);

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
        {Object.entries(availableFilters).map(([group, options]) => (
          <FilterGroup
            key={group}
            group={group}
            options={options}
            isOpen={openKeys.has(group)}
            selected={selected[group]}
            onToggleOpen={() => toggleOpen(group)}
            onToggleValue={(value) => toggleValue(group, value)}
          />
        ))}

        <PriceFilter
          price={price}
          isOpen={openKeys.has("Price")}
          onToggleOpen={() => toggleOpen("Price")}
          onPriceChange={setPrice}
        />
      </div>

      <FilterActions onApply={applyFilters} onClear={clearAll} />
    </aside>
  );
};

export default FilterSidebar;
