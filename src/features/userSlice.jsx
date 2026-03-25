import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import  customFunction  from "./customFunction.jsx";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
};


import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/user`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Not authenticated'+error.message);
        }
    }
);

export const createUser = createAsyncThunk(
    'user/createUser',
    async (userData, thunkAPI) => {
        try {
            const response = await customFunction('users/register', 'POST', {username: userData.username, email: userData.email, password: userData.password, fk_role: 4});
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to create user: ' + error.message);
        }
    }
);

export const getUser = createAsyncThunk(
    'user/getUser',
    async (userData, thunkAPI) => {
        try {
            const response = await customFunction('users/login', 'POST', {email: userData.email, password: userData.password});
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to get user: ' + error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        }
    },extraReducers: (builder) => {
        builder
        .addCase(createUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        })
        .addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder
        .addCase(getUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }
        )
        .addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isLoggedIn = true;
        })
        .addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isLoggedIn = true;
        })
        .addCase(checkAuth.rejected, (state) => {
            state.isLoading = false;
            state.isLoggedIn = false;
        }); 
        
}
});

export const {logout} = userSlice.actions;
export default userSlice.reducer;