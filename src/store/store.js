import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/ProductSlice";
import vendorSlice from "./slices/VendorSlice";
import categorySlice from "./slices/CategorySlice";
import brandSlice from "./slices/BrandSlice";

const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        vendors: vendorSlice.reducer,
        categories: categorySlice.reducer,
        brands: brandSlice.reducer
    },
});
export default store;
