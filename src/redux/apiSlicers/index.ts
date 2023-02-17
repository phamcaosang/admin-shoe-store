import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'


export const apiSlice = createApi({
    reducerPath: 'api/',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shoesstore.azurewebsites.net/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ["Brand", "Type", "Store", "Model", "Property", "Product", "Collection", "Banner", "Contact"],
    endpoints: () => ({}),
})