import { Banner } from "../pages/Banner"
import Category from "../pages/Category"
import { Contact } from "../pages/Contact"
import { Info } from "../pages/Info"

import { RouteType } from "./Index"
export const PagesRoute: RouteType[] =
  [
    {
      path: "/banner",
      element: <Banner />,
    },
    {
      path: "/info",
      element: <Info />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/category",
      element: <Category />,
    },
  ]