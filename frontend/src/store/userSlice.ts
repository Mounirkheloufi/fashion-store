import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    profile_picture?: string;
};

type UserState = {
    token?: string;
    user?: User | null;
    loading: boolean;
    error?: string | null;
};
const initialState: UserState = { 
    token: localStorage.getItem("token") || undefined,
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null,
    loading: false,
    error: null, 
};

export const login = createAsyncThunk(
    "user/login",
        async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
        const res = await API.post("/users/login", payload);
        return res.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || "Login failed");
    }
}
);

export const register = createAsyncThunk(
    "user/register",
    async (payload: { name: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await API.post("/users/register", payload);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Registration failed");
        }
    }
);

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout(state) {
            state.token = undefined;
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = {
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email,
                    role: action.payload.role,
                    profile_picture: action.payload.profile_picture
                };
                state.loading = false;
                state.error = null;

                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(state.user));
            })
            // Login pending
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // login failed
            .addCase(login.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            })
            // register success
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            // register pending
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // register failed
            .addCase(register.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload || "Registration failed";
            });
    },
});

export const { logout } = slice.actions;
export default slice.reducer;