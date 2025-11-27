import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./usersSlice";

// API instance for wishlist
const wishlistApi = axios.create({
  baseURL: "http://localhost:3000/wishlist",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically if exists
wishlistApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch user's wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("User not logged in");
      }

      const response = await wishlistApi.get("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);

// Add product to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("User not logged in");
      }

      const response = await wishlistApi.post("/", { productId });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to wishlist"
      );
    }
  }
);

// Remove product from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("User not logged in");
      }

      const response = await wishlistApi.delete("/remove", {
        data: { productId },
      });
      return { productId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from wishlist"
      );
    }
  }
);

// Toggle product in wishlist (add if not exists, remove if exists)
export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { wishlist } = getState();
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("User not logged in");
      }

      const isInWishlist = wishlist.items.some(
        (item) => item._id === productId || item.toString() === productId
      );

      if (isInWishlist) {
        const response = await wishlistApi.delete("/remove", {
          data: { productId },
        });
        return { action: "removed", productId, data: response.data };
      } else {
        const response = await wishlistApi.post("/", { productId });
        return { action: "added", data: response.data };
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle wishlist"
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearWishlistError: (state) => {
      state.error = null;
    },
    clearWishlistSuccess: (state) => {
      state.successMessage = null;
    },
    clearWishlist: (state) => {
      state.items = [];
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Wishlist
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        // Backend returns wishlist object with products array
        state.items = action.payload.products || [];
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Add to Wishlist
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        // Backend returns updated wishlist object with products array
        state.items = action.payload.products || [];
        state.successMessage = action.payload.message || "Added to wishlist";
        state.error = null;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Remove from Wishlist
    builder
      .addCase(removeFromWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        // Backend returns updated wishlist object with products array
        state.items = action.payload.data.products || [];
        state.successMessage =
          action.payload.data.message || "Removed from wishlist";
        state.error = null;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Toggle Wishlist
    builder
      .addCase(toggleWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.action === "added") {
          // Backend returns updated wishlist object
          state.items = action.payload.data.products || [];
          state.successMessage =
            action.payload.data.message || "Added to wishlist";
        } else if (action.payload.action === "removed") {
          // Backend returns updated wishlist object
          state.items = action.payload.data.products || [];
          state.successMessage =
            action.payload.data.message || "Removed from wishlist";
        }

        state.error = null;
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Clear wishlist on logout
    builder.addCase(logout, (state) => {
      state.items = [];
      state.error = null;
      state.successMessage = null;
      state.isLoading = false;
    });
  },
});

export const { clearWishlistError, clearWishlistSuccess, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
