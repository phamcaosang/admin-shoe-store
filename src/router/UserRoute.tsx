import User from "../pages/user/User"
import UserForm from "../pages/user/Userform"

import { RouteType } from "./Index"

export const UserRoute: RouteType[] =
    [
        {
            path: "/user",
            element: <User />,
        },
        {
            path: "/user/create",
            element: <UserForm new={true} />,
        },
        {
            path: "/user/edit/:userId",
            element: <UserForm new={false} />,
        }
    ]