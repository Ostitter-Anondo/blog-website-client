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
import EditBlog from "./pages/EditBlog";
import Featured from "./pages/Featured";
import VerificationTunnel from "./utils/VerificationTunnel";
import Dashboard from "./pages/Dashboard";
import AccountPage from "./pages/Dashboard/AccountPage";
import MyBlogs from "./pages/Dashboard/MyBlogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: () =>
      axios.get(`${import.meta.env.VITE_dbApi}/recentblogs`, {
        withCredentials: true,
      }),
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
        <VerificationTunnel>
          <AddBlog />
        </VerificationTunnel>
      </PrivateRoute>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <PrivateRoute>
        <VerificationTunnel>
          <Wishlist />
        </VerificationTunnel>
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <VerificationTunnel>
          <Dashboard />
        </VerificationTunnel>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <VerificationTunnel>
              <AccountPage />
            </VerificationTunnel>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myblogs",
        element: (
          <PrivateRoute>
            <VerificationTunnel>
              <MyBlogs />
            </VerificationTunnel>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/featured",
    element: <Featured />,
    loader: () =>
      axios.get(`${import.meta.env.VITE_dbApi}/featured`, {
        withCredentials: true,
      }),
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
    loader: ({ params }) =>
      axios.get(`${import.meta.env.VITE_dbApi}/blog/${params.id}`, {
        withCredentials: true,
      }),
  },
  {
    path: "/editblog/:id",
    element: (
      <PrivateRoute>
        <VerificationTunnel>
          <EditBlog />
        </VerificationTunnel>
      </PrivateRoute>
    ),
    loader: ({ params }) =>
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
