import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { clearStorage } from '../utils/storage'


export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
        if (isRejectedWithValue(action)) {
            console.log(action.payload.status)
            if (action.payload.status === 401) {
                clearStorage()
                toast.error("Bạn hiện không thể thực hiện thao tác này.", {
                    duration: 2000
                })
                toast.error("Vui lòng đăng nhập lại!", {
                    duration: 3000
                })
            }
        }

        return next(action)
    }