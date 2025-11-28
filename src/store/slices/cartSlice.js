import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3000/cart";

const authHeaders = () => {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    const res = await fetch(`${BASE_URL}/`, { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to fetch cart");
    return data;
});

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity = 1 }) => {
        const res = await fetch(`${BASE_URL}/add`, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({ productId, quantity }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to add to cart");
        return data;
    }
);

export const updateCartQuantity = createAsyncThunk(
    "cart/updateQuantity",
    async ({ productId, quantity }) => {
        const res = await fetch(`${BASE_URL}/update`, {
            method: "PUT",
            headers: authHeaders(),
            body: JSON.stringify({ productId, quantity }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to update quantity");
        return data;
    }
);

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ productId }) => {
        const res = await fetch(`${BASE_URL}/remove`, {
            method: "PUT",
            headers: authHeaders(),
            body: JSON.stringify({ productId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to remove item");
        return data;
    }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
    const res = await fetch(`${BASE_URL}/clear`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to clear cart");
    return data; // { message }
});

export const checkoutCart = createAsyncThunk("cart/checkout", async () => {
    const res = await fetch(`${BASE_URL}/checkout`, {
        method: "POST",
        headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to checkout");
    return data; // order response
});

const initialState = {
    items: [],
    totalPrice: 0,
    loading: false,
    error: null,
    lastOrder: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetCartState: () => initialState,
    },
    extraReducers: (builder) => {
        const pending = (state) => {
            state.loading = true;
            state.error = null;
        };
        const fulfilledWithCart = (state, action) => {
            state.loading = false;
            state.error = null;
            const cart = action.payload;
            state.items = cart.items || [];
            state.totalPrice = cart.totalPrice || 0;
        };
        const rejected = (state, action) => {
            state.loading = false;
            state.error = action.payload || "Something went wrong";
        };

        builder
            .addCase(fetchCart.pending, pending)
            .addCase(fetchCart.fulfilled, fulfilledWithCart)
            .addCase(fetchCart.rejected, rejected)

            .addCase(addToCart.pending, pending)
            .addCase(addToCart.fulfilled, fulfilledWithCart)
            .addCase(addToCart.rejected, rejected)

            .addCase(updateCartQuantity.pending, pending)
            .addCase(updateCartQuantity.fulfilled, fulfilledWithCart)
            .addCase(updateCartQuantity.rejected, rejected)

            .addCase(removeFromCart.pending, pending)
            .addCase(removeFromCart.fulfilled, fulfilledWithCart)
            .addCase(removeFromCart.rejected, rejected)

            .addCase(clearCart.pending, pending)
            .addCase(clearCart.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.items = [];
                state.totalPrice = 0;
            })
            .addCase(clearCart.rejected, rejected)

            .addCase(checkoutCart.pending, pending)
            .addCase(checkoutCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.lastOrder = action.payload;
            })
            .addCase(checkoutCart.rejected, rejected);
    },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
