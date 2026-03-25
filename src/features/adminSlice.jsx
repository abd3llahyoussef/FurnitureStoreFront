import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFunction from "./customFunction.jsx";

const initialState = {
  stats: null,
  recentOrders: [],
  allUsers: [],
  allOrders: [],
  isLoading: false,
  error: null,
};

export const fetchAdminStats = createAsyncThunk(
  "admin/fetchStats",
  async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token;
      const response = await customFunction("admin/stats", "POST", {email: thunkAPI.getState().user.user.findUser.email}, token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRecentOrders = createAsyncThunk(
  "admin/fetchRecentOrders",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const response = await customFunction("admin/recent-orders", "POST", { email: thunkAPI.getState().user.user.findUser.email }, token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async ({ pageNumber = 1, pageSize = 10 }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token;
        const response = await customFunction("users/pagination", "POST", {email: thunkAPI.getState().user.user.findUser.email, pageNumber, pageSize}, token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "admin/fetchAllOrders",
  async ({ pageNumber = 1, pageSize = 10 }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const response = await customFunction("orders/all/paginating", "POST", {email: thunkAPI.getState().user.user.findUser.email, pageNumber, pageSize}, token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (deletedEmail, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token;
      await customFunction("users/delete", "DELETE", { email:thunkAPI.getState().user.user.findUser.email,deletedEmail }, token);
      return deletedEmail;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderid, status, totalamount, fk_userId }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token;
        const email = thunkAPI.getState().user.user.findUser.email;
      const response = await customFunction("orders/update", "PUT", { email, orderid, status, totalamount, fk_userId }, token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchRecentOrders.fulfilled, (state, action) => {
        state.recentOrders = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload.users;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload.orders;
        state.pagination = action.payload.pagination;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.allUsers = state.allUsers.filter((u) => u.email !== action.payload);
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.allOrders.findIndex((o) => o.orderid === action.payload.orderid);
        if (index !== -1) {
          state.allOrders[index] = action.payload;
        }
      });
  },
});

export default adminSlice.reducer;
