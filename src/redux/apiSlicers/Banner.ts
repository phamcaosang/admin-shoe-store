import { apiSlice } from ".";
import { notifySuccess, notifyError } from "../../utils/alert"

const TypeName = "Banner"
const TypeAPI = "banner"

export interface BannerModelFull {
    id: string,
    imageDesktop: string,
    imageMobile: string,

}

export interface BannerModelForm {
    imageDesktop: string,
    imageMobile: string,
}

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBanners: builder.query<BannerModelFull[], void>({
            query: () => TypeAPI,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: `${TypeName}` as const, id })), { type: `${TypeName}`, id: 'LIST' }]
                    : [{ type: `${TypeName}`, id: 'LIST' }],
        }),
        addBanner: builder.mutation<BannerModelForm, Partial<BannerModelForm>>({
            query: (item: BannerModelForm) => ({
                url: `${TypeAPI}/create`,
                method: 'POST',
                body: item,
            }),
            invalidatesTags: [{ type: `${TypeName}`, id: 'LIST' }],
            transformErrorResponse: (err: any) => {
                console.log(err)
                notifyError(err.data.message)
            },
            transformResponse: (res: BannerModelFull) => {
                notifySuccess(`${TypeAPI} đã tạo thành công`)
                return res
            },
        }),
        updateBanner: builder.mutation<BannerModelFull, Partial<BannerModelFull>>({
            query: (item: BannerModelFull) => ({
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
        deleteBanner: builder.mutation({
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

export const { useGetBannersQuery, useAddBannerMutation, useUpdateBannerMutation, useDeleteBannerMutation } = extendedApi;
