import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsData } from "../../store/slices/ProductSlice";
import { fetchBrandsData } from "../../store/slices/BrandSlice";
import FilterSidebar from "../../components/GlobalComponents/Filter/Filter";
import Card from "../../components/GlobalComponents/Card/Card";
import BrandsCarousel from "../../components/Category/BrandsCarousel/BrandsCarousel";
import PagePath from "../../components/GlobalComponents/PagePath/PagePath";
import KnowledgeBanners from "../../components/HomeComponents/KnowledgeBanners/KnowledgeBanners";
import { FaChevronDown } from "react-icons/fa";
import Loader from "../../components/GlobalComponents/Loader/Loader.jsx";
import "./Category.css";

function Category() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const allProducts = useSelector((state) => state?.products?.data || []);
  const isLoading = useSelector((store) => store.products.isLoading);
  
  const [sortBy, setSortBy] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
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
  const productsPerPage = 15;
  
  // Get current page from URL
  const currentPage = parseInt(searchParams.get('page')) || 1;

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
    
    const normalizedCategory = category?.toLowerCase().replace(/-/g, " ").trim();
    
    // If no category or "all", return all products
    if (!normalizedCategory || normalizedCategory === "all") {
      return allProducts;
    }
    
    return allProducts.filter((product) => {
      const productCategory = product?.category?.name?.toLowerCase() || "";
      const categoryWords = normalizedCategory.split(" ");
      
      // Check if any word from the URL category matches the product category
      return categoryWords.some(word => productCategory.includes(word)) ||
             productCategory.split(" ").some(word => normalizedCategory.includes(word));
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
        if (p?.[k] !== undefined && p?.[k] !== null) return norm(p[k]).toLowerCase();
        if (p?.specs?.[k] !== undefined) return norm(p.specs[k]).toLowerCase();
        if (p?.specifications?.[k] !== undefined)
          return norm(p.specifications[k]).toLowerCase();
        if (p?.details?.[k] !== undefined) return norm(p.details[k]).toLowerCase();
      }
      return "";
    };

    // Apply selected brand from carousel
    if (selectedBrand) {
      products = products.filter(p => {
        const brandName = norm(typeof p.brand === 'object' ? p.brand.name : p.brand);
        const brandId = typeof p.brand === 'object' ? p.brand._id : null;
        return brandName === selectedBrand || brandId === selectedBrand;
      });
    }

    // Apply brand filter from sidebar
    if (filters.brands.length > 0) {
      products = products.filter(p => {
        const brandName = norm(typeof p.brand === 'object' ? p.brand.name : p.brand).toLowerCase();
        return filters.brands.map(norm).map(s=>s.toLowerCase()).includes(brandName);
      });
    }

    // Apply price filter
    products = products.filter(p => {
      const priceRaw = p.priceAfterDiscount ?? p.price;
      const price = Number(priceRaw) || 0;
      return price >= filters.priceRange.min && price <= filters.priceRange.max;
    });

    // Apply condition filter
    if (filters.condition) {
      products = products.filter(p => {
        const cond = readAttr(p, ["condition", "type"]).toLowerCase();
        return cond === String(filters.condition).toLowerCase();
      });
    }

    // Apply Sim Card filter
    if (filters.simCard.length > 0) {
      products = products.filter(p => {
        const simCard = readAttr(p, ["simCard", "sim", "sim_card"]).toLowerCase();
        return filters.simCard.some(sim => simCard.includes(String(sim).toLowerCase()));
      });
    }

    // Apply RAM filter
    if (filters.ram.length > 0) {
      products = products.filter(p => {
        const ram = readAttr(p, ["ram", "memory", "ramMemory"]).toLowerCase();
        return filters.ram.some(r => ram.includes(String(r).toLowerCase()));
      });
    }

    // Apply Storage filter
    if (filters.storage.length > 0) {
      products = products.filter(p => {
        const storage = readAttr(p, ["storage", "rom", "capacity"]).toLowerCase();
        return filters.storage.some(s => storage.includes(String(s).toLowerCase()));
      });
    }

    // Apply SSD filter
    if (filters.ssd.length > 0) {
      products = products.filter(p => {
        const ssd = readAttr(p, ["ssd", "storage"]).toLowerCase();
        return filters.ssd.some(s => ssd.includes(String(s).toLowerCase()));
      });
    }

    // Apply Color filter
    if (filters.color.length > 0) {
      products = products.filter(p => {
        const color = readAttr(p, ["color", "colour"]).toLowerCase();
        return filters.color.some(c => color.includes(String(c).toLowerCase()));
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        products = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const buildUrlParams = (page = currentPage) => {
    const params = {};
    
    // Add brands
    if (selectedBrand || filters.brands.length > 0) {
      params.brands = selectedBrand || filters.brands.join(',');
    }
    
    // Add price
    if (filters.priceRange.min > 0 || filters.priceRange.max < Infinity) {
      params.minPrice = filters.priceRange.min;
      params.maxPrice = filters.priceRange.max === Infinity ? 199000 : filters.priceRange.max;
    }
    
    // Add condition
    if (filters.condition) {
      params.type = filters.condition;
    }
    
    // Add simCard
    if (filters.simCard.length > 0) {
      params.simCard = filters.simCard.join(',');
    }
    
    // Add ram
    if (filters.ram.length > 0) {
      params.ram = filters.ram.join(',');
    }
    
    // Add storage
    if (filters.storage.length > 0) {
      params.storage = filters.storage.join(',');
    }
    
    // Add ssd
    if (filters.ssd.length > 0) {
      params.ssd = filters.ssd.join(',');
    }
    
    // Add color
    if (filters.color.length > 0) {
      params.color = filters.color.join(',');
    }
    
    // Add sort
    if (sortBy !== 'newest') {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleBrandSelect = (brandId) => {
    // Toggle brand selection
    if (selectedBrand === brandId) {
      setSelectedBrand(null);
      setFilters(prev => ({ ...prev, brands: [] }));
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
        max: filterData.price?.[1] || Infinity
      },
      condition: filterData.filters.Type?.[0]?.toLowerCase() || null,
      simCard: filterData.filters['Sim Card'] || [],
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
    setShowSortDropdown(false);
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
    setSortBy('newest');
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
      <BrandsCarousel category={category} onBrandClick={handleBrandSelect} selectedBrand={selectedBrand} />

      <div className="container py-4">
        <div className="row">
          {/* Filter Sidebar */}
          <div className="col-lg-3 col-md-4 mb-4">
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
          <div className="col-lg-9 col-md-8">
            {/* Category Header with Sort */}
            <div className="mos-category-header mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <h2 className="mos-category-title text-capitalize mb-0">
                    {category?.replace(/-/g, " ")}
                  </h2>
                </div>
                
                {/* Sort Dropdown */}
                <div className="position-relative">
                  <button 
                    className="btn btn-outline-secondary d-flex align-items-center gap-2 mos-sort-btn"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    <span>Sort by</span>
                    <FaChevronDown className={`mos-sort-arrow ${showSortDropdown ? 'rotate' : ''}`} />
                  </button>
                  
                  {showSortDropdown && (
                    <div className="mos-sort-dropdown">
                      <button 
                        className={`mos-sort-option ${sortBy === 'newest' ? 'active' : ''}`}
                        onClick={() => handleSortChange('newest')}
                      >
                        Newest Arrival
                      </button>
                      <button 
                        className={`mos-sort-option ${sortBy === 'priceLowToHigh' ? 'active' : ''}`}
                        onClick={() => handleSortChange('priceLowToHigh')}
                      >
                        Price Low To High
                      </button>
                      <button 
                        className={`mos-sort-option ${sortBy === 'priceHighToLow' ? 'active' : ''}`}
                        onClick={() => handleSortChange('priceHighToLow')}
                      >
                        Price High To Low
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : currentProducts.length > 0 ? (
              <>
                <div className="row g-4">
                  {currentProducts.map((product) => (
                    <div key={product._id} className="col-lg-4 col-md-6 col-12">
                      <Card product={product} />
                    </div>
                  ))}
                </div>

                {/* Pagination - Always show if products exist */}
                {filteredProducts.length > 0 && (
                  <div className="mos-pagination-wrapper mt-5">
                    <nav className="d-flex justify-content-center mos-pagination">
                      <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                          <button 
                            className="page-link page-nav" 
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                          >
                            First Page
                          </button>
                        </li>
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                          <button 
                            className="page-link page-nav" 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>
                        
                        {[...Array(totalPages)].map((_, index) => {
                          const pageNumber = index + 1;
                          if (
                            pageNumber === 1 ||
                            pageNumber === totalPages ||
                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                          ) {
                            return (
                              <li 
                                key={pageNumber} 
                                className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
                              >
                                <button 
                                  className="page-link page-number" 
                                  onClick={() => handlePageChange(pageNumber)}
                                >
                                  {pageNumber}
                                </button>
                              </li>
                            );
                          } else if (
                            pageNumber === currentPage - 2 ||
                            pageNumber === currentPage + 2
                          ) {
                            return <li key={pageNumber} className="page-item disabled"><span className="page-link page-ellipsis">...</span></li>;
                          }
                          return null;
                        })}

                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                          <button 
                            className="page-link page-nav" 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </li>
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                          <button 
                            className="page-link page-nav" 
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                          >
                            Last Page
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-5">
                <div className="mos-no-products-message">
                  <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
                  <p className="text-muted">No products found in this category</p>
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
    </div>
  );
}

export default Category;
