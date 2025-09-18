import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    const res = await API.get("/cart");
    return res.data;
});

export const addToCart = createAsyncThunk(
    "cart/add",
    async (payload: { productId: number; quantity: number }) => {
        const res = await API.post("/cart/items", payload);
        return res.data;
    }
);

const slice = createSlice({
    name: "cart",
    initialState: { cart: null, items: [] } as any,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.items = action.payload.items;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.items.push(action.payload);
        });
    },
});

export default slice.reducer;