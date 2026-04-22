import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFunction from "./customFunction.jsx";
import axios from "axios";

// Helper to load user from localStorage
const loadUser = () => {
    try {
        const serializedUser = localStorage.getItem('user');
        if (serializedUser === null) return null;
        return JSON.parse(serializedUser);
    } catch (err) {
        return null;
    }
};

const initialState = {
    user: loadUser(),
    isLoading: false,
    error: null,
    isLoggedIn: !!loadUser(),
};

const API_URL = "http://localhost:8080/auth";

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/user`, { withCredentials: true });
            return response.data;
        } catch (error) {
            // If session fails but we have a user in state (token-based), we might stay logged in
            // For now, let's just reject if not authenticated via session
            return thunkAPI.rejectWithValue('Not authenticated: ' + error.message);
        }
    }
);

export const createUser = createAsyncThunk(
    'user/createUser',
    async (userData, thunkAPI) => {
        try {
            const response = await customFunction('users/register', 'POST', { username: userData.username, email: userData.email, password: userData.password, fk_role: 4 });
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
            const response = await customFunction('users/login', 'POST', { email: userData.email, password: userData.password });
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to get user: ' + error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
                localStorage.setItem('user', JSON.stringify(action.payload));
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
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                // Don't automatically log out if session check fails, 
                // especially if we're using token-based auth from regular login
            });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;