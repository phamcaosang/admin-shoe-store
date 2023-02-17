export const saveToken = (token: string) => {
    localStorage.setItem("token_shoe", token)
}
export const clearStorage = () => {
    localStorage.clear()
}