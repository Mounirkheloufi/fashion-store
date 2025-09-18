import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

type UserState = {
    token?: string;
    user?: any;
    loading: boolean;
    error?: string;
};
const initialState: UserState = { loading: false };

export const login = createAsyncThunk(
    "user/login",
    async (payload: { email: string; password: string }) => {
        const res = await API.post("/users/login", payload);
        return res.data;
    }
);

export const register = createAsyncThunk(
    "user/register",
    async (payload: { name: string; email: string; password: string }) => {
        const res = await API.post("/users/register", payload);
        return res.data;
    }
);

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout(state) {
            state.token = undefined;
            state.user = undefined;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
  builder.addCase(login.fulfilled, (state, action) => {
    state.token = action.payload.token
    state.user = { 
      id: action.payload.id, 
      name: action.payload.name, 
      email: action.payload.email 
    }
    localStorage.setItem("token", action.payload.token)
    state.loading = false
  })
}

});

export const { logout } = slice.actions;
export default slice.reducer;