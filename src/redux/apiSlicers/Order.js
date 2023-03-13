import { apiSlice } from ".";

const TypeName = "Order"
const TypeAPI = "order"



const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => TypeAPI,
            providesTags: [TypeName],
        }),
        updateOrder: builder.mutation({
            query: (item) => ({
                url: `${TypeAPI}/update/${item.id}`,
                method: 'PUT',
                body: item,
            }),
            invalidatesTags: [TypeName]
        })
    }),
    overrideExisting: false,
})

export const { useGetOrdersQuery, useUpdateOrderMutation } = extendedApi;
