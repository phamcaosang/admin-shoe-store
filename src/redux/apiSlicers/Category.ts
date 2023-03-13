import { apiSlice } from ".";
import { notifySuccess, notifyError } from "../../utils/alert"

const TypeName = "Category"
const TypeAPI = "Chủ đề"

export interface CategoryModelFull {
    id: string,
    name: string,
}

export interface CategoryModelForm {
    name: string,
}

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategorys: builder.query<CategoryModelFull[], void>({
            query: () => `blog/category`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: `${TypeName}` as const, id })), { type: `${TypeName}`, id: 'LIST' }]
                    : [{ type: `${TypeName}`, id: 'LIST' }],
        }),
        addCategory: builder.mutation<CategoryModelForm, Partial<CategoryModelForm>>({
            query: (item: CategoryModelForm) => ({
                url: `blog/category/create`,
                method: 'POST',
                body: item,
            }),
            invalidatesTags: [{ type: `${TypeName}`, id: 'LIST' }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message)
            },
            transformResponse: (res: CategoryModelFull) => {
                notifySuccess(`${TypeAPI} đã tạo thành công`)
                return res
            },
        }),
    }),
    overrideExisting: false,
})

export const { useGetCategorysQuery, useAddCategoryMutation } = extendedApi;
