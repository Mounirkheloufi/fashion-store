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

export const updateCartItem = createAsyncThunk(
    "cart/update",
    async({ id, quantity }: { id: number; quantity: number })=>{
        const res = await API.put(`/cart/items/${id}`, { quantity });
        return { id, quantity};
    }
);

export const deleteCartItem = createAsyncThunk(
    "cart/delete",
    async(id: number)=>{
        await API.delete(`/cart/items/${id}`);
        return id;
    }
);

export const clearCart = createAsyncThunk(
    "cart/clear",
    async()=>{
        await API.delete("/cart");
        return [];
    }
);

export const checkout = createAsyncThunk(
    "cart/checkout",
    async()=>{
        const res = await API.post("/cart/checkout");
        return res.data;
    }
);

const slice = createSlice({
    name: "cart",
    initialState: { cart: null, items: [] as any } ,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.cart = action.payload.cart;
            state.items = action.payload.items;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.items.push(action.payload);
        });
        builder.addCase(updateCartItem.fulfilled, (state, action) => {
            const item = state.items.find((i: any) => i.id === action.payload.id);
            if (item) item.quantity = action.payload.quantity;
        });
        builder.addCase(deleteCartItem.fulfilled, (state, action) => {
            state.items = state.items.filter((i: any) => i.id !== action.payload);
        });
        builder.addCase(clearCart.fulfilled, (state) => {
            state.items = [];
            state.cart = null;
        });
        builder.addCase(checkout.fulfilled, (state, action) => {
            state.cart = null;
            state.items = [];
        });
    },
});

export default slice.reducer;