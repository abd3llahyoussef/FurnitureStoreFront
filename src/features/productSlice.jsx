import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFunction from "./customFunction.jsx";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ pageNumber = 1, pageSize = 6 }, thunkAPI) => {
    try {
      const response = await customFunction("products/all/paginating", "POST", { pageNumber, pageSize });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const email = thunkAPI.getState().user.user.findUser.email;
      const response = await customFunction("products/create", "POST", {productData,email}, token,email);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productid, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const email = thunkAPI.getState().user.user.findUser.email;
      const response = await customFunction("products/delete", "DELETE", { email,productid }, token);
      return productid;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (productData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const email = thunkAPI.getState().user.user.findUser.email;
      const response = await customFunction("products/update", "PUT", { ...productData, email }, token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // Logic to update products list after creation can be handled here
        // or by re-fetching products in the component
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.products = state.products.products.filter((p) => p.productid !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.products.findIndex((p) => p.productid === action.payload.productid);
        if (index !== -1) {
          state.products.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;