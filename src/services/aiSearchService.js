// Helpers for fuzzy matching
const normalize = (str = "") => str.toLowerCase().replace(/[-\s]+/g, "").trim();
const levenshtein = (a = "", b = "") => {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
};
const isNear = (a, b, maxDist = 2) => levenshtein(normalize(a), normalize(b)) <= maxDist;

const CATEGORY_HINTS = {
  mobile: ["موبايل", "تليفون", "موبايلات", "موبيل", "mobile", "phone", "phones"],
  laptop: ["لاب", "لابتوب", "لاب توب", "laptop"],
  tablet: ["تاب", "تابلت", "tablet", "ipad"],
  watch: ["ساعة", "سمارت ووتش", "watch", "smartwatch"],
  earbuds: ["سماعات", "earbuds", "headphones", "headphone", "earphone","سماعة"],
};

// Translate Arabic query to English for category matching
export const translateArabicToEnglish = (query, productsArray = []) => {
  if (!query) return query;
  
  const queryLower = query.toLowerCase().trim();
  
  // Check if query contains any Arabic characters
  const arabicRegex = /[\u0600-\u06FF]/g;
  const hasArabic = arabicRegex.test(query);
  
  if (!hasArabic) return query; // Already English
  
  // Try to find matching category from hints
  for (const [, hints] of Object.entries(CATEGORY_HINTS)) {
    for (const hint of hints) {
      if (queryLower.includes(hint.toLowerCase())) {
        return hint; // Return the English hint (e.g., "phone" or category like "mobile")
      }
    }
  }
  
  // Try to find matching brand
  if (productsArray.length > 0) {
    const brands = Array.from(new Set(productsArray.map(p => {
      if (typeof p.brand === "object") return p.brand.name;
      return p.brand;
    }).filter(Boolean)));
    
    for (const b of brands) {
      if (b && (queryLower.includes(b.toLowerCase()) || isNear(queryLower, b))) {
        return b;
      }
    }
  }
  
  return query; // Return original if no translation found
};

// Simple fallback text search when AI fails
const simpleTextSearch = (query, productsArray) => {
  if (!query || query.trim().length === 0) {
    return {
      matchedProducts: [],
      category: "all",
      filters: {},
      query,
      fallback: true,
    };
  }

  const queryLower = query.toLowerCase().trim();
  const queryNorm = normalize(queryLower);
  const keywords = queryLower.split(/\s+/).filter((k) => k.length > 1);

  // Category hint (Arabic/English)
  let categoryHint = null;
  for (const [cat, hints] of Object.entries(CATEGORY_HINTS)) {
    if (hints.some((h) => queryLower.includes(h))) {
      categoryHint = cat;
      break;
    }
  }

  // Prioritize exact product name matches first
  const exact = productsArray.filter((p) => normalize(p.name).includes(queryNorm));
  if (exact.length > 0) {
    return {
      matchedProducts: exact.slice(0, 30),
      category: categoryHint || "all",
      filters: {},
      query,
      fallback: true,
    };
  }

  const matched = productsArray
    .filter((p) => {
      const name = p.name || "";
      const brand = typeof p.brand === "object" ? p.brand.name : p.brand || "";
      const category = typeof p.category === "object" ? p.category.name : p.category || "";
      const text = `${name} ${brand} ${category}`.toLowerCase();
      const textNorm = normalize(text);

      // direct contains
      if (text.includes(queryLower) || textNorm.includes(queryNorm)) return true;

      // keyword contains
      if (keywords.some((kw) => text.includes(kw))) return true;

      // fuzzy: any keyword near name or brand
      if (
        keywords.some(
          (kw) => isNear(kw, name) || isNear(kw, brand) || isNear(kw, category)
        )
      )
        return true;

      // fuzzy: whole query near name/brand
      if (isNear(queryLower, name) || isNear(queryLower, brand)) return true;

      // category hint match
      if (categoryHint && normalize(category).includes(categoryHint)) return true;

      return false;
    })
    .slice(0, 50);

  return {
    matchedProducts: matched,
    category: "all",
    filters: {},
    query,
    fallback: true,
  };
};

// Main product search - uses simple text search with fuzzy matching
export const searchProductsWithAI = async (query, productsArray) => {
  // Simple search handles:
  // - Arabic and English
  // - Typos (fuzzy matching with Levenshtein distance)
  // - Category hints (موبايل, لابتوب, etc)
  // - Brand detection
  return simpleTextSearch(query, productsArray);
};

// Get live search suggestions without AI (faster)
export const getLiveSuggestions = (query, productsArray, limit = 5) => {
  if (!query || query.length < 2) return [];

  const queryLower = query.toLowerCase();
  const matches = productsArray.filter((p) => {
    const searchText = `${p.name} ${
      typeof p.brand === "object" ? p.brand.name : p.brand
    }`.toLowerCase();
    return searchText.includes(queryLower);
  });

  return matches.slice(0, limit);
};
