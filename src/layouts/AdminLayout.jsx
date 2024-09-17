import React from "react";
import "../assets/css/layout.css";
import { Outlet } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <Outlet />
  );
};

export default AdminLayout;
