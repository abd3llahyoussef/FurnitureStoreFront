import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFunction from "./customFunction";

const initialState = {
  totalAmount: 0,
  status: "Pending",
  userSerial: null,
  // store order records in an array so we can map over them
  orders: [],
  currentOrderId: 0,
  pagination: {},
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ totalAmount, status, userSerial }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const response = await customFunction(
        "orders/create",
        "POST",
        { totalAmount, status, userSerial },
        token,
      );
      return response;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },
);

export const addProductToOrder = createAsyncThunk(
  "order/addProductToOrder",
  async (
    { orderid = initialState.currentOrderId, productId, quantity, price },
    thunkAPI,
  ) => {
    const token = thunkAPI.getState().user.user.token;
    try {
      const response = await customFunction(
        "ordersProducts/add",
        "POST",
        { orderid, productId, quantity, price },
        token,
      );
      return response.data;
    } catch (error) {
      console.error("Error adding product to order:", error);
      throw error;
    }
  },
);
//getProductsByOrder
export const getProductsByOrder = createAsyncThunk(
  "order/getProductsByOrder",
  async ({orderid}, thunkAPI) => {
    const token = thunkAPI.getState().user.user.token;
    try {
      const response = await customFunction(
        "orders-products/by-order",
        "POST",
        {orderid} ,
        token
      );
      return response;
    } catch (error) {
      console.error("Error fetching products by order:", error);
      throw error;
    }
  },
);
export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async ({pageNumber=3, pageSize}, thunkAPI) => {
    const token = thunkAPI.getState().user.user.token;
    const fk_userId = thunkAPI.getState().user.user.findUser.userid;
    try {
      const response = await customFunction(
        "orders/user/paginating",
        "POST",
        {fk_userId, pageNumber, pageSize} ,
        token
      );
      return response;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    updateTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    clearOrder: (state) => {
      state.orders = {};
      state.currentOrderId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      // make sure orders is an array and add the newly created order
      if (!Array.isArray(state.orders)) {
        state.orders = [];
      }
      state.orders.push(action.payload);
      state.currentOrderId = action.payload.orderid;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      // backend returns an array of orders for a user
      state.orders = Array.isArray(action.payload.orders) ? action.payload.orders : [];
      state.pagination = action.payload.pagination;
    });
  },
});

export const { updateTotalAmount, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
