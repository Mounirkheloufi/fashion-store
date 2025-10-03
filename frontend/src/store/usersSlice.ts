import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  is_active: number;
};

type UsersState = {
  list: User[];
  loading: boolean;
  error?: string | null;
};

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
};

//  Récupérer tous les utilisateurs
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/users");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Fetch users failed");
    }
  }
);

//  Bannir un utilisateur
export const banUser = createAsyncThunk(
  "users/banUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await API.put(`/admin/users/${id}/ban`);
      return { id, is_active: res.data.is_active }; // renvoie l’ID banni pour maj la liste
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Ban failed");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchUsers
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });

    // banUser
    builder
  .addCase(banUser.fulfilled, (state, action) => {
    state.list = state.list.map((u) =>
      u._id === action.payload.id
        ? { ...u, is_active: action.payload.is_active }
        : u
    );
  })
  .addCase(banUser.rejected, (state, action: any) => {
    state.error = action.payload;
  });
      },
    });

export default usersSlice.reducer;
