import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { searchProductsWithAI, getLiveSuggestions } from "../../../services/aiSearchService";
import "./SearchInput.css";

function SearchInput() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const allProducts = useSelector((state) => state?.products?.data || []);
  const dropdownRef = useRef(null);

  // Live suggestions (without AI, faster)
  useEffect(() => {
    if (query.length >= 2) {
      const matches = getLiveSuggestions(query, allProducts, 20);
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, allProducts]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.warning("Please enter a search term");
      return;
    }

    setIsSearching(true);
    setShowSuggestions(false);

    try {
      // AI-powered search
      const result = await searchProductsWithAI(query, allProducts);

      if (result.matchedProducts.length === 0) {
        toast.info("No products found. Try different keywords.");
        setIsSearching(false);
        return;
      }

      // If only one product matched, go directly to its details
      if (result.matchedProducts.length === 1 && result.matchedProducts[0]?._id) {
        navigate(`/products/${result.matchedProducts[0]._id}`);
        toast.success("Showing selected product");
        return;
      }

      // Build filter params for URL (for lists)
      const params = new URLSearchParams();
      if (result.filters?.brands?.length > 0) {
        params.set("brands", result.filters.brands.join(","));
      }
      if (result.filters?.ram?.length > 0) {
        params.set("ram", result.filters.ram.join(","));
      }
      if (result.filters?.storage?.length > 0) {
        params.set("storage", result.filters.storage.join(","));
      }
      if (result.filters?.color?.length > 0) {
        params.set("color", result.filters.color.join(","));
      }
      if (result.filters?.condition?.length > 0) {
        params.set("type", result.filters.condition.join(","));
      }
      params.set("search", query);

      // Choose best path: category if present, else brand slug, else all
      const slugify = (v) => v?.toString().toLowerCase().replace(/\s+/g, "-") || "all";
      let categoryPath = slugify(result.category || "");
      if (!result.category || result.category === "all") {
        if (result.filters?.brands?.length > 0) categoryPath = slugify(result.filters.brands[0]);
      }
      if (!categoryPath) categoryPath = "all";

      navigate(`/category/${categoryPath}?${params.toString()}`);

      toast.success(
        `Found ${result.matchedProducts.length} product${
          result.matchedProducts.length > 1 ? "s" : ""
        }`
      );
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = (product) => {
    try {
      if (!product || !product._id) {
        toast.error("Invalid product selected");
        return;
      }

      // Prefer direct navigation to product details to show exactly the chosen item
      navigate(`/products/${product._id}`);

      setQuery("");
      setShowSuggestions(false);
    } catch (error) {
      console.error("Error handling suggestion click:", error);
      toast.error("Failed to open product");
    }
  };

  return (
    <div className="d-inline-flex align-items-center abd-SearchBox" ref={dropdownRef}>
      <form onSubmit={handleSearch} className="w-100">
        <input
          type="search"
          name="search"
          placeholder="What are you looking for today?"
          className="abd-NavInputSerach w-100 p-3"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isSearching}
        />
        {isSearching && (
          <div className="mos-search-loading">
            <span className="spinner-border spinner-border-sm"></span>
          </div>
        )}
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="mos-search-suggestions-dropdown">
          {suggestions.map((product) => (
            <div
              key={product._id}
              className="mos-search-suggestion-item"
              onClick={() => handleSuggestionClick(product)}
            >
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.name}
                className="mos-search-suggestion-image"
              />
              <div className="mos-search-suggestion-details">
                <div className="mos-search-suggestion-name">{product.name}</div>
                <div className="mos-search-suggestion-brand">
                  {typeof product.brand === "object"
                    ? product.brand.name
                    : product.brand}
                </div>
                <div className="mos-search-suggestion-price">
                  {product.priceAfterDiscount || product.price} EGP
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
