import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ActiveContext } from "../context/UserContext";


const Header = () => {

  const {userAuth} = useContext(ActiveContext);
  const { isLoggedIn} = userAuth;
  const navigate = useNavigate()

  const handleLogout = () => {
    if(isLoggedIn){
      sessionStorage.removeItem("user data");
      sessionStorage.removeItem("login status");
      navigate("/login")
    }else{
      navigate("/admin/login");
      sessionStorage.removeItem("adminInfo");
    }
  };

  return (
    <>
      <nav className="navbar p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo-mini" href="index.html">
            <img src="assets/images/logo-mini.svg" alt="logo" />
          </Link>
        </div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-bs-toggle="minimize"
          >
            <span className="mdi mdi-menu"></span>
          </button>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item" onClick={handleLogout}>
              <Link className="nav-link" href="/">
                <div className="navbar-profile">
                  <i className="mdi mdi-logout d-sm-block"></i>
                </div>
              </Link>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-bs-toggle="#offcanvas"
          >
            <span className="mdi mdi-format-line-spacing"></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
