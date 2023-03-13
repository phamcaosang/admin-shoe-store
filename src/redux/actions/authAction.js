import { notifyError, notifySuccess } from "../../utils/alert";
import { clearStorage, saveToken } from "../../utils/storage";
// import { loginEnd, loginFail, loginStart, loginSuccess, logout, verifyUser, verifyUserSuccess } from "../slices/authSlicer";

const LOGIN_URL = "https://shoesstore.azurewebsites.net/api/authenticate/login"

// export const HandleLogin = (dispatch, values) => {
//     dispatch(loginStart())
//     fetch(LOGIN_URL, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values)
//     }).then((response) => {
//         console.log(response);
//         if (!response.ok) {
//             throw Error("Sai email hoặc mật khẩu")
//         }
//         return response.json()
//     })
//         .then((data) => {
//             saveToken(data.token)
//             notifySuccess("Đăng nhập thành công")
//             console.log(data)
//             setTimeout(() => {
//                 dispatch(loginSuccess({
//                     accessToken: data.token,
//                     authenticated: true,
//                     user: {
//                         username: data.userId
//                     }
//                 }))
//             }, 500);
//             //   console.log('Success:', data);
//         })
//         .catch((error) => {
//             clearStorage()
//             dispatch(loginFail({
//                 errors: [error.message]
//             }))
//             notifyError(error.message)
//             console.error('Error:', error.message);
//         });
//     dispatch(loginEnd())
// }

// export const HandleLogout = (dispatch) => {
//     clearStorage()
//     dispatch(logout())
// }


export const verifyUserAuth = (dispatch) => {
    if (localStorage.getItem("token_shoe")) {
        // dispatch(verifyUserSuccess())
    } else {
        clearStorage()
    }
}