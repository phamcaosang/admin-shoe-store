import { ReactNode } from "react"
import { createBrowserRouter } from "react-router-dom"
import { UserRoute } from './UserRoute';
import { ProductRoute } from './ProductRoute';
import { OrderRoute } from './OrderRoute';
import { BlogRoute } from './BlogRoute';
import { PagesRoute } from './PageRoute';
import Login from '../pages/Login';

import App from "../App"
import { ErrorPage } from "../pages/ErrorPage";
import { Dashboard } from "../pages/dashboard/Dashboard";
export interface RouteType {
    path: string,
    element: ReactNode
}

export interface FormType {
    newForm: boolean
}


export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            ...UserRoute,
            ...ProductRoute,
            ...OrderRoute,
            ...BlogRoute,
            ...PagesRoute
        ],
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Login />
    },
])