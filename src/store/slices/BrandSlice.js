import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchBrands = async () => {
    try {
        const response = await fetch(`http://localhost:3000/brands`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching brands:", error);
        throw error;
    }
};

export const fetchBrandsData = createAsyncThunk("fetchBrandsData", fetchBrands);

const brandSlice = createSlice({
    name: "brandSlice",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrandsData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBrandsData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchBrandsData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

export default brandSlice;
