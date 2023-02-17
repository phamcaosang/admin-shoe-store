import { apiSlice } from ".";
import { notifySuccess, notifyError } from "../../utils/alert"

const TypeName = "Property"
const TypeAPI = "property"
const TypeTrans = "Thuộc tính"



export interface InnerProp_ProductType {
    id: string,
    name: string
}

export interface PropertyValue {
    id?: string,
    value: string | number
}
export interface PropertyModelFull {
    id: string,
    name: string,
    productType: InnerProp_ProductType,
    values: PropertyValue[],
    createdAt?: Date,
    updatedAt?: Date
}

export interface PropertyModelForm {
    name: string,
    productTypeId?: string,
    productType: InnerProp_ProductType,
    values: PropertyValue[],
}


const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPropertys: builder.query<PropertyModelFull[], void>({
            query: () => TypeAPI,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: `${TypeName}` as const, id })), { type: `${TypeName}`, id: 'LIST' }]
                    : [{ type: `${TypeName}`, id: 'LIST' }],
        }),
        getPropertyById: builder.query<PropertyModelForm, string>({
            query: (id) => `${TypeAPI}/${id}`,
            providesTags: (result, error, id) => [{ type: `${TypeName}`, id }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message || `${TypeName} Not Found`)
            }
        }),
        addProperty: builder.mutation<PropertyModelForm, Partial<PropertyModelForm>>({
            query: (item: PropertyModelForm) => ({
                url: `${TypeAPI}/create`,
                method: 'POST',
                body: item,
            }),
            invalidatesTags: [{ type: `${TypeName}`, id: 'LIST' }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message)
            },
            transformResponse: (res: PropertyModelFull) => {
                notifySuccess(`${TypeTrans} đã tạo thành công`)
                return res
            },
        }),
        updateProperty: builder.mutation<PropertyModelFull, Partial<PropertyModelFull>>({
            query: (item: PropertyModelFull) => ({
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
        deleteProperty: builder.mutation({
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

export const { useGetPropertysQuery, useGetPropertyByIdQuery, useAddPropertyMutation, useUpdatePropertyMutation, useDeletePropertyMutation } = extendedApi;
