import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserProfile {
    username: string,
}

interface AuthState {
    authenticated: boolean,
    accessToken: null | string,
    user: null | UserProfile,
    loading: boolean,
    errors: null | string[]
}

const initialState: AuthState = {
    authenticated: false,
    accessToken: localStorage.getItem("token_shoe"),
    user: null,
    loading: false,
    errors: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action: PayloadAction<AuthState>) => {
            console.log(action.payload);

            state.accessToken = action.payload.accessToken;
            state.authenticated = true;
            state.user = action.payload.user;
        },
        loginFail: (state, action: PayloadAction<AuthState>) => {
            state.errors = action.payload.errors;
        },
        loginEnd: (state) => {
            state.loading = false;
            state.errors = null;
        },
        logout: (state) => {
            state.accessToken = null;
            state.authenticated = false;
            state.user = null;
        },
        verifyUserSuccess: (state) => {
            state.authenticated = true;
            state.user = {
                username: "admin"
            }
        },
        verifyUserFailed: (state) => {
            state.authenticated = false;
            state.user = null;
            state.accessToken = null;
        }
    }
})

export const { loginStart, loginSuccess, loginFail, loginEnd, logout, verifyUserSuccess, verifyUserFailed } = authSlice.actions;

export default authSlice.reducer;