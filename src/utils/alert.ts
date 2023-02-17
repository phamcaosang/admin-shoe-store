import toast from "react-hot-toast"

export const notifySuccess = (message: string): void => {
    toast.success(message)
}

export const notifyError = (message: string): void => {
    toast.error(message)
}