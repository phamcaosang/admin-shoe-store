import { apiSlice } from ".";
import { notifySuccess, notifyError } from "../../utils/alert"

const TypeAPI = "authenticate"

export interface LoginForm {
    email: string,
    password: string
}

export interface EditForm {
    id: string,
    email: string,
    avatar: string
}

export interface UserInfo {
    id?: string,
    avatar: string,
    email: string,
    roles: string[],
}

interface LoginResult {
    success: boolean,
    token: string,
    validTo: string,
    userId: string
}

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerAdmin: builder.mutation<LoginForm, LoginForm>({
            query: (item: LoginForm) => ({
                url: `${TypeAPI}/register-admin`,
                method: "POST",
                body: item
            })
        }),
        login: builder.mutation<LoginResult, LoginForm>({
            query: (item: LoginForm) => ({
                url: `${TypeAPI}/login`,
                method: "POST",
                body: item
            })
        }),
        verify: builder.query<UserInfo, void>({
            query: () => ({
                url: "user/verify",
                method: "GET"
            })
        }),
        editUser: builder.mutation<UserInfo, EditForm>({
            query: (item: EditForm) => ({
                url: `user/update/${item.id}`,
                method: "PUT",
                body: item
            })
        })

    }),
    overrideExisting: false,
})

export const { useRegisterAdminMutation, useLoginMutation, useVerifyQuery, useEditUserMutation, endpoints } = extendedApi;
