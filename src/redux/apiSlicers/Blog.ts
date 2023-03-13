import { apiSlice } from ".";
import { notifySuccess, notifyError } from "../../utils/alert"

const TypeName = "Blog"
const TypeAPI = "blog"

export interface BlogModelFull {
    id: string,
    title: string,
    content: string,
    slug: string,
    image: string,
    scategoryId: string

}

export interface BlogModelForm {
    title: string,
    content: string,
    image: string,
    categoryId: string,
    slug?: string,

}

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query<BlogModelFull[], void>({
            query: () => TypeAPI,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: `${TypeName}` as const, id })), { type: `${TypeName}`, id: 'LIST' }]
                    : [{ type: `${TypeName}`, id: 'LIST' }],
        }),
        getBlogById: builder.query<BlogModelFull[], string>({
            query: (id) => `${TypeAPI}/${id}`,
            providesTags: (result, error, id) => [{ type: `${TypeName}`, id }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message || `Khong tim thay ${TypeName} `)
            },
        }),
        addBlog: builder.mutation<void, Partial<BlogModelForm>>({
            query: (item: BlogModelForm) => ({
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
                notifySuccess(`${TypeAPI} đã tạo thành công`)
                return res
            },
        }),
        updateBlog: builder.mutation<BlogModelFull, Partial<BlogModelFull>>({
            query: (item: BlogModelFull) => ({
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
                notifySuccess(`${TypeName} cập nhập thành công`)
                return res
            },
        }),
        deleteBlog: builder.mutation({
            query: (id: string) => ({
                url: `${TypeAPI}/delete/${id}`,
                method: 'DELETE',
            }),
            transformResponse: (res) => {
                notifySuccess(`${TypeName} đã bị xóa`)
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

export const { useGetBlogsQuery, useAddBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation, useGetBlogByIdQuery } = extendedApi;
