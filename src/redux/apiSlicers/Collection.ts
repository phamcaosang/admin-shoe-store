import { apiSlice } from ".";
import { notifySuccess, notifyError } from "../../utils/alert"

const TypeName = "Collection"
const TypeAPI = "collection"
const TypeTrans = "Bộ sưu tập"


export interface CollectionModelFull {
    id: string,
    name: string,
    description: string,
    image?: string,
    createdAt?: Date,
    updatedAt?: Date,
    products: {
        sku: string,
        name: string
    }[],
    skus?: string[],
}

export interface CollectModelForm {
    name: string,
    description: string,
    image?: string,
    products: {
        sku: string,
        name: string
    }[],
    skus?: string[],
}

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCollections: builder.query<CollectionModelFull[], void>({
            query: () => TypeAPI,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: `${TypeName}` as const, id })), { type: `${TypeName}`, id: 'LIST' }]
                    : [{ type: `${TypeName}`, id: 'LIST' }],
        }),
        getCollectionById: builder.query<CollectModelForm, string>({
            query: (id) => `${TypeAPI}/${id}`,
            providesTags: (result, error, id) => [{ type: `${TypeName}`, id }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message || `${TypeName} Not Found`)
            }
        }),
        addCollection: builder.mutation<CollectModelForm, Partial<CollectModelForm>>({
            query: (brand: CollectModelForm) => ({
                url: `${TypeAPI}/create`,
                method: 'POST',
                body: brand,
            }),
            invalidatesTags: [{ type: `${TypeName}`, id: 'LIST' }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message)
            },
            transformResponse: (res: CollectionModelFull) => {
                notifySuccess(`${TypeTrans} đã tạo thành công`)
                return res
            },
        }),
        updateCollection: builder.mutation<CollectionModelFull, Partial<CollectionModelFull>>({
            query: (brand: CollectionModelFull) => ({
                url: `${TypeAPI}/update/${brand.id}`,
                method: 'PUT',
                body: brand,
            }),
            invalidatesTags: (result, error, arg) => [{ type: `${TypeName}`, id: arg.id }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message)
            },
            transformResponse: (res: any) => {
                notifySuccess(`${TypeTrans} cập nhập thành công`)
                return res
            },
        }),
        deleteCollection: builder.mutation({
            query: (id: string) => ({
                url: `${TypeAPI}/delete/${id}`,
                method: 'DELETE',
            }),
            transformResponse: (res) => {
                notifySuccess(`${TypeTrans} đã bị xóa`)
                return res
            },
            transformErrorResponse: (err: any) => {
                console.log(err);
                notifyError(err.data.message)
            },
            invalidatesTags: (result, error, arg) => [{ type: `${TypeName}`, id: 'LIST' }],

        })
    }),
    overrideExisting: false,
})

export const { useGetCollectionsQuery, useGetCollectionByIdQuery, useUpdateCollectionMutation, useAddCollectionMutation, useDeleteCollectionMutation } = extendedApi;