import { apiSlice } from ".";

const TypeName = "Info"
const TypeAPI = "info"



const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInfo: builder.query({
            query: () => TypeAPI,
            providesTags: [TypeName]
        }),
        updateInfo: builder.mutation({
            query: (item) => ({
                url: `${TypeAPI}/update`,
                method: 'PUT',
                body: item,
            }),
            invalidatesTags: [TypeName]
        })
    }),
    overrideExisting: false,
})

export const { useGetInfoQuery, useUpdateInfoMutation } = extendedApi;
