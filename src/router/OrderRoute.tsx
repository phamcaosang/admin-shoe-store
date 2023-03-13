import Order from "../pages/order/Order"
import { RouteType } from "./Index"

export const OrderRoute: RouteType[] =
    [
        {
            path: "/order",
            element: <Order />,
        },
    ]