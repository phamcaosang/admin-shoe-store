import { apiSlice } from ".";
import { notifySuccess, notifyError } from "../../utils/alert"

const TypeName = "Model"
const TypeAPI = "model"
const TypeTrans = "Kiểu mẫu"

export interface InnerBrand_Model {
    id: string,
    name: string
}
export interface InnerProductType_Model {
    id: string,
    name: string
}

export interface ModelModelFull {
    id: string,
    name: string,
    description: string,
    brand: InnerBrand_Model,
    productType: InnerProductType_Model,
    createdAt?: Date,
    updatedAt?: Date
}

export interface ModelModelForm {
    name: string,
    description: string,
    brand: InnerBrand_Model,
    productType: InnerProductType_Model,
    brandId?: string,
    productTypeId?: string
}

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getModels: builder.query<ModelModelFull[], void>({
            query: () => TypeAPI,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: `${TypeName}` as const, id })), { type: `${TypeName}`, id: 'LIST' }]
                    : [{ type: `${TypeName}`, id: 'LIST' }],
        }),
        getModelById: builder.query<ModelModelForm, string>({
            query: (id) => `${TypeAPI}/${id}`,
            providesTags: (result, error, id) => [{ type: `${TypeName}`, id }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message || `${TypeName} Not Found`)
            },
            transformResponse: (res: ModelModelForm) => {
                return {
                    ...res,
                    brandId: res.brand.id,
                    productTypeId: res.productType.id
                }
            }
        }),
        addModel: builder.mutation<ModelModelForm, Partial<ModelModelForm>>({
            query: (item: ModelModelForm) => ({
                url: `${TypeAPI}/create`,
                method: 'POST',
                body: item,
            }),
            invalidatesTags: [{ type: `${TypeName}`, id: 'LIST' }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message)
            },
            transformResponse: (res: any) => {
                notifySuccess(`${TypeTrans} đã tạo thành công`)
                return res
            },
        }),
        updateModel: builder.mutation<ModelModelFull, Partial<ModelModelFull>>({
            query: (item: ModelModelFull) => ({
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
        deleteModel: builder.mutation({
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

export const { useGetModelsQuery, useGetModelByIdQuery, useUpdateModelMutation, useAddModelMutation, useDeleteModelMutation } = extendedApi;
