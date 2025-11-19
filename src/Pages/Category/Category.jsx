import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsData } from "../../store/slices/ProductSlice";
import { fetchBrandsData } from "../../store/slices/BrandSlice";
import FilterSidebar from "../../components/GlobalComponents/Filter/Filter";
import Card from "../../components/GlobalComponents/Card/Card";
import BrandsCarousel from "../../components/CategoryComponents/BrandsCarousel/BrandsCarousel";
import PagePath from "../../components/GlobalComponents/PagePath/PagePath";
import KnowledgeBanners from "../../components/HomeComponents/KnowledgeBanners/KnowledgeBanners";
import Pagination from "../../components/GlobalComponents/Pagination/Pagination";
import CategoryHeader from "../../components/CategoryComponents/CategoryHeader/CategoryHeader";
import MobileFilterSidebar from "../../components/CategoryComponents/MobileFilterSidebar/MobileFilterSidebar";
import Loader from "../../components/GlobalComponents/Loader/Loader.jsx";
import "./Category.css";
import CompareList from "../../components/CategoryComponents/CompareList/CompareList.jsx";

function Category() {
  const { category, compare } = useParams();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const allProducts = useSelector((state) => state?.products?.data || []);
  const isLoading = useSelector((store) => store.products.isLoading);

  const [sortBy, setSortBy] = useState("newest");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: { min: 0, max: Infinity },
    condition: null,
    simCard: [],
    ram: [],
    storage: [],
    ssd: [],
    color: [],
  });
  const productsPerPage = 12;

  // Get current page from URL
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch(fetchProductsData());
    dispatch(fetchBrandsData());
  }, [dispatch]);

  // Reset filters when category changes
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

  // Filter products by category
  const filterProductsByCategory = () => {
    if (!allProducts.length) return [];

    const normalizedCategory = category
      ?.toLowerCase()
      .replace(/-/g, " ")
      .trim();

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
        productCategory
          .split(" ")
          .some((word) => normalizedCategory.includes(word))
      );
    });
  };

  // Apply filters and sorting
  const getFilteredAndSortedProducts = () => {
    let products = filterProductsByCategory();

    // helpers to normalize and read attributes safely across categories
    const norm = (val) => {
      if (val === undefined || val === null) return "";
      if (Array.isArray(val)) return val.join(" ");
      if (typeof val === "object") {
        if (val.name) return String(val.name);
        return Object.values(val).join(" ");
      }
      return String(val);
    };

    const readAttr = (p, keys = []) => {
      for (const k of keys) {
        if (p?.[k] !== undefined && p?.[k] !== null)
          return norm(p[k]).toLowerCase();
        if (p?.specs?.[k] !== undefined) return norm(p.specs[k]).toLowerCase();
        if (p?.specifications?.[k] !== undefined)
          return norm(p.specifications[k]).toLowerCase();
        if (p?.details?.[k] !== undefined)
          return norm(p.details[k]).toLowerCase();
      }
      return "";
    };

    // Helper to normalize text (lowercase, remove extra spaces and dashes)
    const normalizeText = (val) => {
      return String(val || "")
        .toLowerCase()
        .replace(/[-\s]+/g, "")
        .trim();
    };

    // Helper to normalize capacity values (remove spaces between number and unit)
    const normalizeCapacity = (val) => {
      return String(val).toLowerCase().replace(/\s+/g, "").trim();
    };

    // Helper to get array values or single value
    const getValues = (val) => {
      if (Array.isArray(val)) return val;
      return [val];
    };

    // Apply selected brand from carousel
    if (selectedBrand) {
      products = products.filter((p) => {
        const brandName = norm(
          typeof p.brand === "object" ? p.brand.name : p.brand
        );
        const brandId = typeof p.brand === "object" ? p.brand._id : null;
        return brandName === selectedBrand || brandId === selectedBrand;
      });
    }

    // Apply brand filter from sidebar
    if (filters.brands.length > 0) {
      products = products.filter((p) => {
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
    products = products.filter((p) => {
      const priceRaw = p.priceAfterDiscount ?? p.price;
      const price = Number(priceRaw) || 0;
      return price >= filters.priceRange.min && price <= filters.priceRange.max;
    });

    // Apply condition filter
    if (filters.condition) {
      products = products.filter((p) => {
        const cond = normalizeText(readAttr(p, ["condition", "type"]));
        return cond === normalizeText(filters.condition);
      });
    }

    // Apply Sim Card filter
    if (filters.simCard.length > 0) {
      products = products.filter((p) => {
        const simCardRaw = readAttr(p, ["simCard", "sim", "sim_card"]);
        const simCardNormalized = normalizeText(simCardRaw);
        const normalizedFilters = filters.simCard.map(normalizeText);

        // Exact match only
        return normalizedFilters.includes(simCardNormalized);
      });
    }

    // Apply RAM filter
    if (filters.ram.length > 0) {
      products = products.filter((p) => {
        const ramValues = getValues(p.ram || p.memory || p.ramMemory);
        const normalizedRam = ramValues.map(normalizeCapacity);
        const selectedRam = filters.ram.map(normalizeCapacity);
        return normalizedRam.some((r) => selectedRam.includes(r));
      });
    }

    // Apply Storage filter
    if (filters.storage.length > 0) {
      products = products.filter((p) => {
        const storageValues = getValues(p.storage || p.rom || p.capacity);
        const normalizedStorage = storageValues.map(normalizeCapacity);
        const selectedStorage = filters.storage.map(normalizeCapacity);
        return normalizedStorage.some((s) => selectedStorage.includes(s));
      });
    }

    // Apply SSD filter
    if (filters.ssd.length > 0) {
      products = products.filter((p) => {
        const ssdValues = getValues(
          p.ssd ||
            (p.category?.name?.toLowerCase().includes("laptop")
              ? p.storage
              : null)
        );
        const normalizedSsd = ssdValues.filter(Boolean).map(normalizeCapacity);
        const selectedSsd = filters.ssd.map(normalizeCapacity);
        return normalizedSsd.some((s) => selectedSsd.includes(s));
      });
    }

    // Apply Color filter
    if (filters.color.length > 0) {
      products = products.filter((p) => {
        const productColor = normalizeText(p.color || p.colour || "");
        const selectedColors = filters.color.map(normalizeText);
        return selectedColors.includes(productColor);
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        products = [...products].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "priceLowToHigh":
        products = [...products].sort((a, b) => {
          const priceA = a.priceAfterDiscount || a.price;
          const priceB = b.priceAfterDiscount || b.price;
          return priceA - priceB;
        });
        break;
      case "priceHighToLow":
        products = [...products].sort((a, b) => {
          const priceA = a.priceAfterDiscount || a.price;
          const priceB = b.priceAfterDiscount || b.price;
          return priceB - priceA;
        });
        break;
      default:
        break;
    }

    return products;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const buildUrlParams = (page = currentPage) => {
    const params = {};

    // Add brands
    if (selectedBrand || filters.brands.length > 0) {
      params.brands = selectedBrand || filters.brands.join(",");
    }

    // Add price
    if (filters.priceRange.min > 0 || filters.priceRange.max < Infinity) {
      params.minPrice = filters.priceRange.min;
      params.maxPrice =
        filters.priceRange.max === Infinity ? 199000 : filters.priceRange.max;
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

  const handlePageChange = (pageNumber) => {
    setSearchParams(buildUrlParams(pageNumber));
  };

  const handleBrandSelect = (brandId) => {
    // Toggle brand selection
    if (selectedBrand === brandId) {
      setSelectedBrand(null);
      setFilters((prev) => ({ ...prev, brands: [] }));
    } else {
      setSelectedBrand(brandId);
    }
    // Update URL after state changes
    setTimeout(() => {
      setSearchParams(buildUrlParams(1));
    }, 0);
  };

  const handleFilterApply = (filterData) => {
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
    setFilters(newFilters);

    // If brand filter applied from sidebar, clear carousel selection
    if (newFilters.brands.length > 0) {
      setSelectedBrand(null);
    }

    setTimeout(() => {
      setSearchParams(buildUrlParams(1));
    }, 0);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    setTimeout(() => {
      setSearchParams(buildUrlParams(1));
    }, 0);
  };

  const handleClearAll = () => {
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
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mos-category-page">
      {/* Page Path - Above Brands Carousel */}
      <div className="container pt-4">
        <PagePath path={category?.replace(/-/g, " ")} />
      </div>

      {/* Brands Carousel */}
      <BrandsCarousel
        category={category}
        onBrandClick={handleBrandSelect}
        selectedBrand={selectedBrand}
      />

      <div className="container py-4">
        <div className="row">
          {/* Filter Sidebar - Desktop Only */}
          <div className="col-lg-3 col-md-4 mb-4 d-none d-md-block">
            <FilterSidebar
              category={category}
              onApply={handleFilterApply}
              availableProducts={filterProductsByCategory()}
              selectedBrandFromCarousel={selectedBrand}
              currentFilters={filters}
              onClearAll={handleClearAll}
            />
          </div>

          {/* Products Grid */}
          <div className="col-lg-9 col-md-8 col-12">
            {/* Category Header with Mobile Filter Button */}
            <CategoryHeader
              category={category}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              onMobileFilterClick={() => setShowMobileFilter(true)}
            />

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <>
                <div className="row g-3 justify-content-center">
                  {currentProducts.map((product) => (
                    <div
                      key={product._id}
                      className="col-lg-4 col-sm-6 col-12"
                      style={{ maxWidth: "350px" }}
                    >
                      <Card product={product} />
                    </div>
                  ))}
                </div>

                {/* Pagination Component */}
                <Pagination
                  currentPage={currentPage}
                  totalProducts={filteredProducts.length}
                  productsPerPage={productsPerPage}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-5">
                <div className="mos-no-products-message">
                  <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
                  <p className="text-muted">
                    No products found in this category
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Knowledgebase section - full width below products */}
        {filteredProducts.length > 0 && (
          <div className="row mt-5">
            <div className="col-12">
              <KnowledgeBanners />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filter Sidebar */}
      <MobileFilterSidebar
        show={showMobileFilter}
        onClose={() => setShowMobileFilter(false)}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        category={category}
        onFilterApply={handleFilterApply}
        availableProducts={filterProductsByCategory()}
        selectedBrandFromCarousel={selectedBrand}
        currentFilters={filters}
        onClearAll={handleClearAll}
      />
      {compare == "compare" && <CompareList />}
    </div>
  );
}

export default Category;
