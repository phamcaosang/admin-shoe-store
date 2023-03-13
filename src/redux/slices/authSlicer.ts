import { createSlice } from '@reduxjs/toolkit'
import { clearStorage, saveToken } from '../../utils/storage'
import { apiSlice } from '../apiSlicers'
import { endpoints } from '../apiSlicers/Auth'

interface AuthState {
    accessToken: null | string,
    userId?: string,
    email?: string,
    avatar?: string
}

const initialState: AuthState = {
    accessToken: localStorage.getItem("token_shoe"),
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.accessToken = null
            clearStorage()
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.accessToken = payload.token
                saveToken(payload.token)
            }
        ).addMatcher(
            endpoints.verify.matchRejected,
            (state, { payload }) => {
                state.accessToken = null
                clearStorage()
            }
        ).addMatcher(
            endpoints.verify.matchFulfilled,
            (state, { payload }) => {

                if (!payload.roles.includes("Admin")) {
                    state.accessToken = null
                    clearStorage()
                } else {
                    state.email = payload.email
                    state.avatar = payload.avatar
                    state.userId = payload.id
                }
            }
        ).addMatcher(
            endpoints.editUser.matchFulfilled,
            (state, { payload }) => {
                if (!payload.roles.includes("Admin")) {
                    state.accessToken = null
                    clearStorage()
                } else {
                    state.email = payload.email
                    state.avatar = payload.avatar
                    state.userId = payload.id
                }
            }
        )
    }
})

export const { logOut } = authSlice.actions;

export default authSlice.reducer;