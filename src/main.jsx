import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import ContextProvider from "./utils/ContextProvider";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Signin from "./pages/Login/Signin";
import NotFound from "./pages/NotFound";
import AddBlog from "./pages/AddBlog";
import PrivateRoute from "./utils/PrivateRoute";
import AllBlogs from "./pages/AllBlogs";
import axios from "axios";
import Wishlist from "./pages/Wishlist";
import BlogArticle from "./pages/BlogArticle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
    children: [
      {
        path: "/login",
        element: <Signin />,
      },
    ],
  },
  {
    path: "/addblog",
    element: (
      <PrivateRoute>
        <AddBlog />
      </PrivateRoute>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <PrivateRoute>
        <Wishlist />
      </PrivateRoute>
    ),
  },
  {
    path: "/blogs",
    element: <AllBlogs />,
    loader: () =>
      axios.get(`${import.meta.env.VITE_dbApi}/blogs`, {
        withCredentials: true,
      }),
  },
  {
    path: "/blog/:id",
    element: <BlogArticle />,
    loader: ({params}) =>
      axios.get(`${import.meta.env.VITE_dbApi}/blog/${params.id}`, {
        withCredentials: true,
      }),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </ContextProvider>
  </StrictMode>
);
