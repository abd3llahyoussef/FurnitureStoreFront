import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice.jsx";
import productReducer from "./productSlice.jsx";
import cartReducer from "./cartSlice.jsx";
import orderReducer from "./orderSlice.jsx";
import adminReducer from "./adminSlice.jsx";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    admin: adminReducer,
  },
})

export default store;