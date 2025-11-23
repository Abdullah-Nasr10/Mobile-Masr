import { useState, useEffect, useCallback } from "react";
import { filterProductsByCategory, applyFilters, applySorting } from "./useFilterLogic";
import { buildUrlParams } from "./useUrlParams";

export const useCategoryFilters = (allProducts, category, searchParams, setSearchParams) => {
  const [sortBy, setSortBy] = useState(() => searchParams.get("sort") || "newest");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [filters, setFilters] = useState(() => {
    // Initialize filters from URL params
    const brands = searchParams.get("brands");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const type = searchParams.get("type");
    const simCard = searchParams.get("simCard");
    const ram = searchParams.get("ram");
    const storage = searchParams.get("storage");
    const ssd = searchParams.get("ssd");
    const color = searchParams.get("color");

    return {
      brands: brands ? brands.split(",").filter(Boolean) : [],
      priceRange: {
        min: minPrice ? parseFloat(minPrice) : 0,
        max: maxPrice ? parseFloat(maxPrice) : Infinity,
      },
      condition: type || null,
      simCard: simCard ? simCard.split(",").filter(Boolean) : [],
      ram: ram ? ram.split(",").filter(Boolean) : [],
      storage: storage ? storage.split(",").filter(Boolean) : [],
      ssd: ssd ? ssd.split(",").filter(Boolean) : [],
      color: color ? color.split(",").filter(Boolean) : [],
    };
  });

  useEffect(() => {
    setSelectedBrand(null);
    setFilters({
      brands: [],
      priceRange: { min: 0, max: Infinity },
      condition: null,
      simCard: [],
      ram: [],
      storage: [],
      ssd: [],
      color: [],
    });
  }, [category]);

  const getCategoryProducts = useCallback(() => {
    return filterProductsByCategory(allProducts, category);
  }, [allProducts, category]);

  const getFilteredAndSortedProducts = useCallback(() => {
    const categoryProducts = getCategoryProducts();
    const filteredProducts = applyFilters(categoryProducts, filters, selectedBrand);
    return applySorting(filteredProducts, sortBy);
  }, [getCategoryProducts, filters, selectedBrand, sortBy]);

  const handleBrandSelect = useCallback((brandId) => {
    const isClearing = selectedBrand === brandId;
    const newBrandId = isClearing ? null : brandId;

    setSelectedBrand(newBrandId);

    // Clear brands from filters when selecting from carousel
    const updatedFilters = { ...filters, brands: [] };
    setFilters(updatedFilters);

    // Build params with updated values
    const params = buildUrlParams(updatedFilters, sortBy, newBrandId, 1);
    setSearchParams(params);
  }, [filters, sortBy, selectedBrand, setSearchParams]);

  const handleFilterApply = useCallback((filterData) => {
    const newFilters = {
      brands: filterData.filters.Brands || [],
      priceRange: {
        min: filterData.price?.[0] || 0,
        max: filterData.price?.[1] || Infinity,
      },
      condition: filterData.filters.Type?.[0]?.toLowerCase() || null,
      simCard: filterData.filters["Sim Card"] || [],
      ram: filterData.filters.Ram || [],
      storage: filterData.filters.Storage || [],
      ssd: filterData.filters.SSD || [],
      color: filterData.filters.Color || [],
    };

    console.log("🔍 Filter Apply - New Filters:", newFilters);

    setFilters(newFilters);
    if (newFilters.brands.length > 0) setSelectedBrand(null);

    // Build URL params with new filters
    const params = buildUrlParams(newFilters, sortBy, null, 1);
    console.log("🔗 URL Params:", params);

    setSearchParams(params);
  }, [sortBy, setSearchParams]);

  const handleSortChange = useCallback((sortOption) => {
    setSortBy(sortOption);
    // Use sortOption immediately instead of waiting for state update
    setSearchParams(buildUrlParams(filters, sortOption, selectedBrand, 1));
  }, [filters, selectedBrand, setSearchParams]);

  const handleClearAll = useCallback(() => {
    setSelectedBrand(null);
    setFilters({
      brands: [],
      priceRange: { min: 0, max: Infinity },
      condition: null,
      simCard: [],
      ram: [],
      storage: [],
      ssd: [],
      color: [],
    });
    setSortBy("newest");
    setSearchParams({});
  }, [setSearchParams]);

  return {
    sortBy,
    selectedBrand,
    filters,
    filterProductsByCategory: getCategoryProducts,
    getFilteredAndSortedProducts,
    buildUrlParams: (page) => buildUrlParams(filters, sortBy, selectedBrand, page),
    handleBrandSelect,
    handleFilterApply,
    handleSortChange,
    handleClearAll,
  };
};
