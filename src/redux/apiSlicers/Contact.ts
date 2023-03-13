import { apiSlice } from ".";
import { notifySuccess, notifyError } from "../../utils/alert"

const TypeName = "Contact"
const TypeAPI = "contact"

export interface ContactModelFull {
    id: string,
    phone: string,
    address: string,
    email: string,
    zalo: string,
    facebook: string,
    map: string,
    image: string
}

export interface ContactModelForm {
    phone: string,
    address: string,
    email: string,
    zalo: string,
    facebook: string,
    map: string,
    image: string
}

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getContacts: builder.query<ContactModelFull[], void>({
            query: () => TypeAPI,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: `${TypeName}` as const, id })), { type: `${TypeName}`, id: 'LIST' }]
                    : [{ type: `${TypeName}`, id: 'LIST' }],
        }),
        updateContact: builder.mutation<ContactModelFull, Partial<ContactModelFull>>({
            query: (item: ContactModelFull) => ({
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
                notifySuccess(`Liên hệ đã được cập nhập`)
                return res
            },
        }),
    }),
    overrideExisting: false,
})

export const { useGetContactsQuery, useUpdateContactMutation } = extendedApi;
