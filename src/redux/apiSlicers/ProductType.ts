import { apiSlice } from ".";
import { notifySuccess, notifyError } from "../../utils/alert"

const TypeName = "Type"
const TypeAPI = "product-type"
const TypeTrans = "Phân loại sản phẩm"


export interface TypeModelFull {
    id: string,
    name: string,
    description: string,
    image?: string,
    createdAt?: Date,
    updatedAt?: Date
}

export interface TypeModelForm {
    name: string,
    image?: string,
    description: string,
}

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTypes: builder.query<TypeModelFull[], void>({
            query: () => TypeAPI,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: `${TypeName}` as const, id })), { type: `${TypeName}`, id: 'LIST' }]
                    : [{ type: `${TypeName}`, id: 'LIST' }],
        }),
        getTypeById: builder.query<TypeModelForm, string>({
            query: (id) => `${TypeAPI}/${id}`,
            providesTags: (result, error, id) => [{ type: `${TypeName}`, id }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message || `${TypeName} Not Found`)
            }
        }),
        addType: builder.mutation<TypeModelForm, Partial<TypeModelForm>>({
            query: (item: TypeModelForm) => ({
                url: `${TypeAPI}/create`,
                method: 'POST',
                body: item,
            }),
            invalidatesTags: [{ type: `${TypeName}`, id: 'LIST' }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message)
            },
            transformResponse: (res: TypeModelFull) => {
                notifySuccess(`${TypeTrans} đã tạo thành công`)
                return res
            },
        }),
        updateType: builder.mutation<TypeModelFull, Partial<TypeModelFull>>({
            query: (item: TypeModelFull) => ({
                url: `${TypeAPI}/update/${item.id}`,
                method: 'PUT',
                body: item,
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
        deleteType: builder.mutation({
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

export const { useGetTypesQuery, useGetTypeByIdQuery, useAddTypeMutation, useUpdateTypeMutation, useDeleteTypeMutation } = extendedApi;
