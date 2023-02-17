import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { apiSlice } from './apiSlicers'
import { rtkQueryErrorLogger } from './errorMacro'
import { authSlice } from './slices/authSlicer'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, rtkQueryErrorLogger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)