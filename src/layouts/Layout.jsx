import React from "react";
import Sidebar from "../components/Sidebar";
import "../assets/css/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="container-scroller ">
      <Sidebar />

      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
