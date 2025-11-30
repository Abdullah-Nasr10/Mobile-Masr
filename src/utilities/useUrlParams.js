// URL parameter management utilities

// Build URL params from filters, sort, and page
export const buildUrlParams = (filters, sortBy, selectedBrand, page = 1) => {
  const params = {};

  // Add brands
  if (selectedBrand || filters.brands.length > 0) {
    params.brands = selectedBrand || filters.brands.join(",");
  }

  // Add price
  const defaultMax = 199000; // slider default upper bound in UI
  const max = filters.priceRange.max;
  const includeMax = max < Infinity && max !== defaultMax;
  if (includeMax) {
    params.maxPrice = max;
  }

  // Add condition
  if (filters.condition) {
    params.type = filters.condition;
  }

  // Add simCard
  if (filters.simCard.length > 0) {
    params.simCard = filters.simCard.join(",");
  }

  // Add ram
  if (filters.ram.length > 0) {
    params.ram = filters.ram.join(",");
  }

  // Add storage
  if (filters.storage.length > 0) {
    params.storage = filters.storage.join(",");
  }

  // Add ssd
  if (filters.ssd.length > 0) {
    params.ssd = filters.ssd.join(",");
  }

  // Add color
  if (filters.color.length > 0) {
    params.color = filters.color.join(",");
  }

  // Add sort
  if (sortBy !== "newest") {
    params.sort = sortBy;
  }

  // Add page
  if (page > 1) {
    params.page = page;
  }

  return params;
};

// Parse filters from URL search params
export const parseFiltersFromUrl = (searchParams) => {
  const filters = {
    brands: [],
    priceRange: { min: 0, max: Infinity },
    condition: null,
    simCard: [],
    ram: [],
    storage: [],
    ssd: [],
    color: [],
  };

  // Parse brands
  const brands = searchParams.get("brands");
  if (brands) {
    filters.brands = brands.split(",").filter(Boolean);
  }

  // Parse price
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  if (minPrice) filters.priceRange.min = parseFloat(minPrice);
  if (maxPrice) filters.priceRange.max = parseFloat(maxPrice);

  // Parse condition
  const type = searchParams.get("type");
  if (type) filters.condition = type;

  // Parse simCard
  const simCard = searchParams.get("simCard");
  if (simCard) {
    filters.simCard = simCard.split(",").filter(Boolean);
  }

  // Parse ram
  const ram = searchParams.get("ram");
  if (ram) {
    filters.ram = ram.split(",").filter(Boolean);
  }

  // Parse storage
  const storage = searchParams.get("storage");
  if (storage) {
    filters.storage = storage.split(",").filter(Boolean);
  }

  // Parse ssd
  const ssd = searchParams.get("ssd");
  if (ssd) {
    filters.ssd = ssd.split(",").filter(Boolean);
  }

  // Parse color
  const color = searchParams.get("color");
  if (color) {
    filters.color = color.split(",").filter(Boolean);
  }

  return filters;
};

// Parse sort option from URL
export const parseSortFromUrl = (searchParams) => {
  return searchParams.get("sort") || "newest";
};
