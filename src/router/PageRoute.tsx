import { Banner } from "../pages/Banner"
import { Contact } from "../pages/Contact"
import { RouteType } from "./Index"
export const PagesRoute: RouteType[] =
  [
    {
      path: "/banner",
      element: <Banner />,
    },
    {
      path: "/about",
      element: <div></div>,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
  ]