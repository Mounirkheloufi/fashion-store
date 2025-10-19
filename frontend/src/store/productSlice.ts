import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  stock: number;
  category?: string;
  score?: number;
};

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

// --- Thunks ---
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const res = await axios.get("http://localhost:5000/api/products");
  return res.data;
});

export const createProduct = createAsyncThunk(
  "products/create",
  async (newProduct: Omit<Product, "id">) => {
    const res = await axios.post<Product>("/api/products", newProduct);
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }: { id: number; data: Partial<Product> }) => {
    await axios.put(`/api/products/${id}`, data);
    return { id, data };
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    await axios.delete(`/api/products/${id}`);
    return id;
  }
);

// --- Slice ---
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload.data };
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
