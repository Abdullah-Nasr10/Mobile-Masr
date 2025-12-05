import { useState, useEffect, useCallback } from "react";
import { filterProductsByCategory, applyFilters, applySorting } from "./useFilterLogic";
import { buildUrlParams, parseFiltersFromUrl, parseSortFromUrl } from "./useUrlParams";
import { translateArabicToEnglish } from "../services/aiSearchService";

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

    // Apply search query from URL (name/brand/category contains search text)
    let searchQuery = searchParams.get("search")?.toLowerCase().trim();
    
    // Translate Arabic query to English for matching
    if (searchQuery) {
      const translated = translateArabicToEnglish(searchQuery, categoryProducts);
      searchQuery = translated.toLowerCase().trim();
    }
    
    const afterSearch = searchQuery
      ? categoryProducts.filter((p) => {
          const text = `${p.name || ""} ${
            typeof p.brand === "object" ? p.brand.name : p.brand || ""
          } ${p.category?.name || ""}`
            .toLowerCase();
          return text.includes(searchQuery);
        })
      : categoryProducts;

    const filteredProducts = applyFilters(afterSearch, filters, selectedBrand);
    return applySorting(filteredProducts, sortBy);
  }, [getCategoryProducts, filters, selectedBrand, sortBy, searchParams]);

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

    // Build params with brand name (not id) in URL - preserve search query
    const searchQuery = searchParams.get("search");
    const params = buildUrlParams(updatedFilters, sortBy, brandValueForUrl, 1, searchQuery);
    setSearchParams(params);
  }, [filters, sortBy, setSearchParams, allProducts, category, searchParams]);

  const handleFilterApply = useCallback((filterData) => {
    const newFilters = {
      brands: filterData.filters.Brands || [],
      priceRange: {
        min: filterData.price?.[0] || 0,
        max: filterData.price?.[1] || Infinity,
      },
      condition: filterData.filters.Type && filterData.filters.Type.length > 0 
        ? filterData.filters.Type[0].toLowerCase() 
        : null,
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

    // Preserve search query
    const searchQuery = searchParams.get("search");
    const params = buildUrlParams(newFilters, sortBy, brandValueForUrl, 1, searchQuery);
    console.log("🔗 URL Params:", params);
    setSearchParams(params);
  }, [sortBy, setSearchParams, selectedBrand, allProducts, category, searchParams]);

  const handleSortChange = useCallback((sortOption) => {
    setSortBy(sortOption);
    // Use sortOption immediately instead of waiting for state update - preserve search
    const searchQuery = searchParams.get("search");
    setSearchParams(buildUrlParams(filters, sortOption, selectedBrand, 1, searchQuery));
  }, [filters, selectedBrand, setSearchParams, searchParams]);

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
    // Preserve search query when clearing filters
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [setSearchParams, searchParams]);

  return {
    sortBy,
    selectedBrand,
    filters,
    filterProductsByCategory: getCategoryProducts,
    getFilteredAndSortedProducts,
    buildUrlParams: (page) => {
      const searchQuery = searchParams.get("search");
      return buildUrlParams(filters, sortBy, selectedBrand, page, searchQuery);
    },
    handleBrandSelect,
    handleFilterApply,
    handleSortChange,
    handleClearAll,
  };
};
