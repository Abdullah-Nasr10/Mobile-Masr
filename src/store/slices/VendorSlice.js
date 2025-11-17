import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// http://localhost:3000/vendor/:id

const fetchData = async (id) => {
    try {
        const data = await fetch(`http://localhost:3000/vendors/${id}`);
        const result = await data.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching vendor:", error);
        return error;
    }
};


export const fetchVendorData = createAsyncThunk("fetchVendorData", fetchData);

const vendorSlice = createSlice({
    name: "vendorSlice",
    initialState: {
        data: [],
        isLoading: true,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVendorData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchVendorData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchVendorData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});


export default vendorSlice;