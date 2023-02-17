import { apiSlice } from ".";
import { notifySuccess, notifyError } from "../../utils/alert"

const TypeName = "Product"
const TypeAPI = "product"
const TypeTrans = "Sản phẩm"


export interface ISizeProp {
    propertyValueId: string, //Size
    quantity: number,
}

export interface IPropList {
    propertyValueId: string, //Color
    sizes: ISizeProp[],
    images: string[],
    attributeCode?: number
}

export interface ProductModelFull {
    id: string,
    sku: string,
    name: string,
    modelId: string,
    model?: {
        id: string,
        name: string,
        productType?: {
            id: string,
            name: string
        }
    },
    storeId: string,
    store?: {
        id: string,
        name: string
    },
    price: number,
    values: IPropList[],
    createdAt?: Date,
    updatedAt?: Date,
}

export interface ProductModelForm {
    sku: string,
    name: string,
    modelId: string,
    model?: {
        id: string,
        name: string,
        productType?: {
            id: string,
            name: string
        }
    },
    store?: {
        id: string,
        name: string
    },
    storeId: string,
    price: number,
    values: IPropList[],
    createdAt?: Date,
    updatedAt?: Date,
}

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductModelFull[], void>({
            query: () => TypeAPI,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: `${TypeName}` as const, id })), { type: `${TypeName}`, id: 'LIST' }]
                    : [{ type: `${TypeName}`, id: 'LIST' }],
        }),
        getProductBySku: builder.query<ProductModelForm, string>({
            query: (sku) => `${TypeAPI}/sku/${sku}`,
            providesTags: (result, error, id) => [{ type: `${TypeName}`, id }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message || `${TypeName} Not Found`)
            }
        }),
        addProduct: builder.mutation<ProductModelForm, Partial<ProductModelForm>>({
            query: (item: ProductModelForm) => ({
                url: `${TypeAPI}/create`,
                method: 'POST',
                body: item,
            }),
            invalidatesTags: [{ type: `${TypeName}`, id: 'LIST' }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message)
            },
            transformResponse: (res: ProductModelFull) => {
                notifySuccess(`${TypeTrans} đã tạo thành công`)
                return res
            },
        }),
        updateProduct: builder.mutation<ProductModelFull, Partial<ProductModelFull>>({
            query: (item: ProductModelFull) => ({
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
        deleteProductBySku: builder.mutation({
            query: (sku: string) => ({
                url: `${TypeAPI}/delete/${sku}`,
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

export const { useGetProductsQuery, useGetProductBySkuQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductBySkuMutation } = extendedApi;
