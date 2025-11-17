import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/ProductSlice";
import vendorSlice from "./slices/VendorSlice";

const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        vendors: vendorSlice.reducer
    },
});
export default store;
