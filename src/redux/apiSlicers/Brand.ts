import { apiSlice } from ".";
import { notifySuccess, notifyError } from "../../utils/alert"

const TypeName = "Brand"
const TypeAPI = "brand"
const TypeTrans = "Thương hiệu"

export interface BrandModelFull {
    id: string,
    name: string,
    image?: string,
    description: string,
    createdAt?: Date,
    updatedAt?: Date
}

export interface BrandModelForm {
    name: string,
    image?: string,
    description: string,
}

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBrands: builder.query<BrandModelFull[], void>({
            query: () => TypeAPI,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: `${TypeName}` as const, id })), { type: `${TypeName}`, id: 'LIST' }]
                    : [{ type: `${TypeName}`, id: 'LIST' }],
        }),
        getBrandById: builder.query<BrandModelForm, string>({
            query: (id) => `${TypeAPI}/${id}`,
            providesTags: (result, error, id) => [{ type: `${TypeName}`, id }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message || `${TypeName} Not Found`)
            }
        }),
        addBrand: builder.mutation<BrandModelForm, Partial<BrandModelForm>>({
            query: (brand: BrandModelForm) => ({
                url: `${TypeAPI}/create`,
                method: 'POST',
                body: brand,
            }),
            invalidatesTags: [{ type: `${TypeName}`, id: 'LIST' }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message)
            },
            transformResponse: (res: BrandModelFull) => {
                notifySuccess(`${TypeTrans} đã tạo thành công`)
                return res
            },
        }),
        updateBrand: builder.mutation<BrandModelFull, Partial<BrandModelFull>>({
            query: (brand: BrandModelFull) => ({
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
        deleteBrand: builder.mutation({
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

export const { useGetBrandsQuery, useGetBrandByIdQuery, useUpdateBrandMutation, useAddBrandMutation, useDeleteBrandMutation } = extendedApi;


// async onQueryStarted(id, { dispatch, queryFulfilled }) {
//     try {
//         await queryFulfilled
//         notifySuccess("Brand updated")
//     } catch (err) {
//         console.log(err)
//         notifyError("Failed to update brand")
//     }
// }