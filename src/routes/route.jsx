import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/users/Login";
import UserPrivateRoutes from "../privateRoutes/UserPrivateRoutes";
import AdminPrivateRoute from "../privateRoutes/AdminPrivateRoute";
import AddBlog from "../pages/AddBlog";
import UpdateBlog from "../pages/UpdateBlog";
import UserProfileUpdate from "../pages/users/UserProfileUpdate";
import AdminLogin from "../pages/admin/AdminLogin";
import AddUser from "../pages/admin/AddUser";
import AdminLayout from "../layouts/AdminLayout";
import UpdateAdmin from "../pages/admin/UpdateAdmin";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      {
        path: "/dashboard", element: (
          <UserPrivateRoutes>
            <Dashboard />
          </UserPrivateRoutes>
        )
      },
      {
        path: "/addblog", element: (
          <UserPrivateRoutes>
            <AddBlog />
          </UserPrivateRoutes>
        ),
      },
      {
        path: "/update-Blog/:id", element: (
          <UserPrivateRoutes>
            <UpdateBlog />
          </UserPrivateRoutes>
        )
      },
      {
        path: "/profile-Update", element: (
          <UserPrivateRoutes>
            <UserProfileUpdate />
          </UserPrivateRoutes>
        )
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/login",
    element:
      <AdminLogin />
  },
  {
    path: "/dashboard/admin",
    element: (
      <AdminPrivateRoute>
        <Layout>
          <AdminLayout />
        </Layout>
      </AdminPrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/admin",
        element: (
          <AdminPrivateRoute>
            <Dashboard />
          </AdminPrivateRoute>
        )
      },
      {
        path: "/dashboard/admin/add-user",
        element: (
          <AdminPrivateRoute>
            <AddUser />
          </AdminPrivateRoute>
        )
      },
      {
        path: "/dashboard/admin/update-user/:id",
        element: (
          <AdminPrivateRoute>
            <UpdateAdmin />
          </AdminPrivateRoute>
        )
      },
      {
        path: "/dashboard/admin/update-blog/:id",
        element: (
          <AdminPrivateRoute>
            <UpdateBlog />
          </AdminPrivateRoute>
        )
      },
      {
        path: "/dashboard/admin/add-blog", 
        element: (
          <AdminPrivateRoute>
            <AddBlog />
          </AdminPrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
