// Helper functions for filtering and normalization
export const filterHelpers = {
  // Normalize text (lowercase, remove extra spaces and dashes)
  normalizeText: (val) => {
    return String(val || "")
      .toLowerCase()
      .replace(/[-\s]+/g, "")
      .trim();
  },

  // Normalize capacity values (remove spaces between number and unit)
  normalizeCapacity: (val) => {
    return String(val).toLowerCase().replace(/\s+/g, "").trim();
  },

  // Normalize any value to string
  norm: (val) => {
    if (val === undefined || val === null) return "";
    if (Array.isArray(val)) return val.join(" ");
    if (typeof val === "object") {
      if (val.name) return String(val.name);
      return Object.values(val).join(" ");
    }
    return String(val);
  },

  // Read attribute from product (checks multiple possible keys)
  readAttr: (p, keys = []) => {
    for (const k of keys) {
      if (p?.[k] !== undefined && p?.[k] !== null)
        return filterHelpers.norm(p[k]).toLowerCase();
      if (p?.specs?.[k] !== undefined)
        return filterHelpers.norm(p.specs[k]).toLowerCase();
      if (p?.specifications?.[k] !== undefined)
        return filterHelpers.norm(p.specifications[k]).toLowerCase();
      if (p?.details?.[k] !== undefined)
        return filterHelpers.norm(p.details[k]).toLowerCase();
    }
    return "";
  },

  // Get array values or single value as array
  getValues: (val) => {
    if (Array.isArray(val)) return val;
    return [val];
  },
};

// Filter products by category
export const filterProductsByCategory = (allProducts, category) => {
  if (!allProducts.length) return [];

  const normalizedCategory = category?.toLowerCase().replace(/-/g, " ").trim();

  // If no category or "all", return all products
  if (!normalizedCategory || normalizedCategory === "all") {
    return allProducts;
  }

  return allProducts.filter((product) => {
    const productCategory = product?.category?.name?.toLowerCase() || "";
    const categoryWords = normalizedCategory.split(" ");

    // Check if any word from the URL category matches the product category
    return (
      categoryWords.some((word) => productCategory.includes(word)) ||
      productCategory.split(" ").some((word) => normalizedCategory.includes(word))
    );
  });
};

// Apply all filters to products
export const applyFilters = (products, filters, selectedBrand) => {
  let filteredProducts = [...products];
  const { norm, readAttr, normalizeText, normalizeCapacity, getValues } = filterHelpers;

  // Apply selected brand from carousel
  if (selectedBrand) {
    filteredProducts = filteredProducts.filter((p) => {
      const brandName = norm(typeof p.brand === "object" ? p.brand.name : p.brand);
      const brandId = typeof p.brand === "object" ? p.brand._id : null;
      return brandName === selectedBrand || brandId === selectedBrand;
    });
  }

  // Apply brand filter from sidebar
  if (filters.brands.length > 0) {
    filteredProducts = filteredProducts.filter((p) => {
      const brandName = norm(
        typeof p.brand === "object" ? p.brand.name : p.brand
      ).toLowerCase();
      return filters.brands
        .map(norm)
        .map((s) => s.toLowerCase())
        .includes(brandName);
    });
  }

  // Apply price filter
  filteredProducts = filteredProducts.filter((p) => {
    const priceRaw = p.priceAfterDiscount ?? p.price;
    const price = Number(priceRaw) || 0;
    return price >= filters.priceRange.min && price <= filters.priceRange.max;
  });

  // Apply condition filter
  if (filters.condition) {
    filteredProducts = filteredProducts.filter((p) => {
      const cond = normalizeText(readAttr(p, ["condition", "type"]));
      return cond === normalizeText(filters.condition);
    });
  }

  // Apply Sim Card filter
  if (filters.simCard.length > 0) {
    filteredProducts = filteredProducts.filter((p) => {
      const simCardRaw = readAttr(p, ["simCard", "sim", "sim_card"]);
      const simCardNormalized = normalizeText(simCardRaw);
      const normalizedFilters = filters.simCard.map(normalizeText);
      return normalizedFilters.includes(simCardNormalized);
    });
  }

  // Apply RAM filter
  if (filters.ram.length > 0) {
    filteredProducts = filteredProducts.filter((p) => {
      const ramValues = getValues(p.ram || p.memory || p.ramMemory);
      const normalizedRam = ramValues.map(normalizeCapacity);
      const selectedRam = filters.ram.map(normalizeCapacity);
      return normalizedRam.some((r) => selectedRam.includes(r));
    });
  }

  // Apply Storage filter
  if (filters.storage.length > 0) {
    filteredProducts = filteredProducts.filter((p) => {
      const storageValues = getValues(p.storage || p.rom || p.capacity);
      const normalizedStorage = storageValues.map(normalizeCapacity);
      const selectedStorage = filters.storage.map(normalizeCapacity);
      return normalizedStorage.some((s) => selectedStorage.includes(s));
    });
  }

  // Apply SSD filter
  if (filters.ssd.length > 0) {
    filteredProducts = filteredProducts.filter((p) => {
      const ssdValues = getValues(
        p.ssd ||
          (p.category?.name?.toLowerCase().includes("laptop") ? p.storage : null)
      );
      const normalizedSsd = ssdValues.filter(Boolean).map(normalizeCapacity);
      const selectedSsd = filters.ssd.map(normalizeCapacity);
      return normalizedSsd.some((s) => selectedSsd.includes(s));
    });
  }

  // Apply Color filter
  if (filters.color.length > 0) {
    filteredProducts = filteredProducts.filter((p) => {
      const productColor = normalizeText(p.color || p.colour || "");
      const selectedColors = filters.color.map(normalizeText);
      return selectedColors.includes(productColor);
    });
  }

  return filteredProducts;
};

// Apply sorting to products
export const applySorting = (products, sortBy) => {
  const sortedProducts = [...products];

  switch (sortBy) {
    case "newest":
      return sortedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    case "priceLowToHigh":
      return sortedProducts.sort((a, b) => {
        const priceA = a.priceAfterDiscount || a.price;
        const priceB = b.priceAfterDiscount || b.price;
        return priceA - priceB;
      });
    case "priceHighToLow":
      return sortedProducts.sort((a, b) => {
        const priceA = a.priceAfterDiscount || a.price;
        const priceB = b.priceAfterDiscount || b.price;
        return priceB - priceA;
      });
    default:
      return sortedProducts;
  }
};
