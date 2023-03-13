import { RouteType } from "./Index"
import Blog from "../pages/blog/Blog"
import BlogFormNew from "../pages/blog/BlogFormNew"
import BlogFormEdit from "../pages/blog/BlogFormEdit"


export const BlogRoute: RouteType[] =
    [
        {
            path: "/blog",
            element: <Blog />,
        },
        {
            path: "/blog/create",
            element: <BlogFormNew />,
        },
        {
            path: "/blog/edit/:id",
            element: <BlogFormEdit />,
        },
    ]