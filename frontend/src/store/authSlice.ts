import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id: string;
    name: string;
    email?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}

const storedUser = localStorage.getItem("user");
const storedAccessToken = localStorage.getItem("accessToken");

const initialState: AuthState = {
    user: storedUser ? (() => {
        try {
            return JSON.parse(storedUser);
        } catch {
            return null;
        }
    })() : null,
    token: storedAccessToken || null,
    refreshToken: null,
    isAuthenticated: !!storedAccessToken,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        login: (
            state,
            action: PayloadAction<{
                user: User;
                token: string;
                refreshToken: string;
            }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;

            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
        },

        setAccessToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;

            localStorage.setItem("accessToken", action.payload);
        },
    },
});

export const { login, logout, setAccessToken } = authSlice.actions;

export default authSlice.reducer;