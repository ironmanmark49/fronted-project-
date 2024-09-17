import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.min.js"
import UserContext from "./context/UserContext";
import AdminContext from "./context/adminContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AdminContext>
      <UserContext>
        <ToastContainer />
        <RouterProvider router={routes} />
      </UserContext>
    </AdminContext>
  </>
);
