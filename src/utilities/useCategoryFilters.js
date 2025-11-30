import { useState, useEffect, useCallback } from "react";
import { filterProductsByCategory, applyFilters, applySorting } from "./useFilterLogic";
import { buildUrlParams, parseFiltersFromUrl, parseSortFromUrl } from "./useUrlParams";

export const useCategoryFilters = (allProducts, category, searchParams, setSearchParams) => {
  const [sortBy, setSortBy] = useState(() => searchParams.get("sort") || "newest");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [filters, setFilters] = useState(() => parseFiltersFromUrl(searchParams));

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

  // Sync from URL on change and on mount
  useEffect(() => {
    const urlFilters = parseFiltersFromUrl(searchParams);
    const urlSort = parseSortFromUrl(searchParams);
    setFilters(urlFilters);
    setSortBy(urlSort);

    // Map brand name from URL back to brand._id for swiper highlighting
    const brandsParam = searchParams.get("brands");
    if (brandsParam && !brandsParam.includes(",")) {
      // Find the brand id by name
      const categoryProducts = filterProductsByCategory(allProducts, category);
      let foundBrandId = null;
      for (const p of categoryProducts) {
        if (p.brand && typeof p.brand === "object") {
          if (p.brand.name === brandsParam || String(p.brand._id) === brandsParam) {
            foundBrandId = p.brand._id;
            break;
          }
        }
      }
      setSelectedBrand(foundBrandId || brandsParam);
    } else if (brandsParam && brandsParam.includes(",")) {
      // multiple brands -> sidebar owns brand selection
      setSelectedBrand(null);
    }
    // If no brandsParam, leave selectedBrand as is
  }, [searchParams, allProducts, category]);

  const getCategoryProducts = useCallback(() => {
    return filterProductsByCategory(allProducts, category);
  }, [allProducts, category]);

  const getFilteredAndSortedProducts = useCallback(() => {
    const categoryProducts = getCategoryProducts();
    const filteredProducts = applyFilters(categoryProducts, filters, selectedBrand);
    return applySorting(filteredProducts, sortBy);
  }, [getCategoryProducts, filters, selectedBrand, sortBy]);

  const handleBrandSelect = useCallback((brandId) => {
    // Keep selectedBrand as brand._id for swiper highlighting
    setSelectedBrand(brandId);

    // Find brand name for URL param
    let brandNameForUrl = null;
    const categoryProducts = filterProductsByCategory(allProducts, category);
    for (const p of categoryProducts) {
      if (p.brand && typeof p.brand === "object" && String(p.brand._id) === String(brandId)) {
        brandNameForUrl = p.brand.name;
        break;
      }
    }
    const brandValueForUrl = brandNameForUrl || brandId; // fallback to id

    // Clear brands from filters when selecting from carousel
    const updatedFilters = { ...filters, brands: [] };
    setFilters(updatedFilters);

    // Build params with brand name (not id) in URL
    const params = buildUrlParams(updatedFilters, sortBy, brandValueForUrl, 1);
    setSearchParams(params);
  }, [filters, sortBy, setSearchParams, allProducts, category]);

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

    // Decide brand value for URL
    let brandValueForUrl = null;
    if (newFilters.brands.length > 0) {
      // Sidebar brands override swiper selection
      setSelectedBrand(null);
      // buildUrlParams will use filters.brands internally if brandValueForUrl stays null
    } else if (selectedBrand) {
      // Translate selectedBrand (_id) to name for URL
      const categoryProducts = filterProductsByCategory(allProducts, category);
      for (const p of categoryProducts) {
        if (p.brand && typeof p.brand === "object" && String(p.brand._id) === String(selectedBrand)) {
          brandValueForUrl = p.brand.name;
          break;
        }
      }
      if (!brandValueForUrl) brandValueForUrl = selectedBrand; // fallback to id
    }

    const params = buildUrlParams(newFilters, sortBy, brandValueForUrl, 1);
    console.log("🔗 URL Params:", params);
    setSearchParams(params);
  }, [sortBy, setSearchParams, selectedBrand, allProducts, category]);

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
