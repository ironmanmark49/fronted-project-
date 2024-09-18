import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import BrandLogo from '../assets/images/Brand-logo.png'
// import "../assets/Sidebar.css"
// eslint-disable-next-line
import $ from "jquery";
import jQuery from "jquery";

const Sidebar = () => {

  useEffect(() => {
    // responsive sidebar jQuery
    (function ($) {

      $(function () {
        $('[data-bs-toggle="#offcanvas"]').on("click", function () {
          $('.sidebar-offcanvas').toggleClass('active')
        });
      });
    })(jQuery);

    // hover collaps menu
    (function ($) {

      //Open submenu on hover in compact sidebar mode and horizontal menu mode
      $(document).on('mouseenter mouseleave', '.sidebar .nav-item', function (ev) {
        var body = $('body');
        var sidebarIconOnly = body.hasClass("sidebar-icon-only");
        var sidebarFixed = body.hasClass("sidebar-fixed");
        if (!('ontouchstart' in document.documentElement)) {
          if (sidebarIconOnly) {
            if (sidebarFixed) {
              if (ev.type === 'mouseenter') {
                body.removeClass('sidebar-icon-only');
              }
            } else {
              var $menuItem = $(this);
              if (ev.type === 'mouseenter') {
                $menuItem.addClass('hover-open')
              } else {
                $menuItem.removeClass('hover-open')
              }
            }
          }
        }
      });
    })(jQuery);

    // Expand sidebar jQuery
    (function ($) {

      $(function () {
        var body = $('body');
        // var contentWrapper = $('.content-wrapper');
        // var scroller = $('.container-scroller');
        // var footer = $('.footer');
        var sidebar = $('.sidebar');


        //Close other submenu in sidebar on opening any

        sidebar.on('show.bs.collapse', '.collapse', function () {
          sidebar.find('.collapse.show').collapse('hide');
        });


        //Change sidebar and content-wrapper height
        // applyStyles();

        $('[data-bs-toggle="minimize"]').on("click", function () {
          if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
            body.toggleClass('sidebar-hidden');
          } else {
            body.toggleClass('sidebar-icon-only');
          }
        });

        //checkbox and radios
        $(".form-check label,.form-radio label").append('<i className="input-helper"></i>');

        //fullscreen
        $("#fullscreen-button").on("click", function toggleFullScreen() {
          if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
              document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
              document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
              document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (document.documentElement.msRequestFullscreen) {
              document.documentElement.msRequestFullscreen();
            }
          } else {
            if (document.cancelFullScreen) {
              document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            }
          }
        })
      });
    })(jQuery);
  }, [])

  if (sessionStorage.getItem("user data")) {
    var ProfilePic = JSON.parse(sessionStorage.getItem("user data"))[1]
  }
  else {
    ProfilePic = ""
  }

  const NavbarItems = [
    {
      elementLink: "/dashboard",
      iconClass: "view-dashboard-outline",
      spanElement: "Dashboard",
    },
    {
      elementLink: "/addblog",
      iconClass: "checkbox-marked-circle-plus-outline",
      spanElement: "Add Blog",
    },
    {
      elementLink: "/profile-Update",
      iconClass: "account-arrow-up",
      spanElement: "Update Profile"
    }
  ];

  const AdminNavbar = [
    {
      elementLink: "/dashboard/admin",
      iconClass: "view-dashboard-outline",
      spanElement: "Admin",
    },
    {
      elementLink: "/dashboard/admin/add-user",
      iconClass: "checkbox-marked-circle-plus-outline",
      spanElement: "Add User",
    },
    {
      elementLink: "/dashboard/admin/add-blog",
      iconClass: "mdi mdi-tag-plus",
      spanElement: "Add Blog",
    },
  ];

  const [path, setPath] = useState(window.location.pathname);
  const [isAdmin, setIsAdmin] = useState(false);
  const [detailArray, setDetailArray] = useState(null);

  useEffect(() => {
    setDetailArray(JSON.parse(sessionStorage.getItem("user data")))
    // setProfileName(sessionStorage.getItem("user data")[])
  }, [])

  useEffect(() => {
    setPath(window.location.pathname);

    if (!path.includes("/dashboard/admin")) {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  }, [path, isAdmin]);

  return (
    <>
      <Header />
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <Link className="sidebar-brand brand-logo text-white text-decoration-none fs-6" to="/">
            <img src={BrandLogo} alt="logo" />
          </Link>
          <Link className="sidebar-brand brand-logo-mini" to="/">
            <img src={BrandLogo} alt="logo" />
          </Link>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  {
                    ProfilePic ?
                      <>
                        <img
                          className="img-xs rounded-circle"
                          src={`http://ec2-3-109-32-46.ap-south-1.compute.amazonaws.com/api/images/userprofile/${ProfilePic}`}
                          alt=""
                        />
                        <span className="count bg-success"></span>
                      </> 
                      : 
                      <i className="mdi mdi-account-circle fs-1"></i>
                  }

                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal">
                    {detailArray ? detailArray[2] : "Balraj"}
                  </h5>
                  <span>{detailArray ? "Member" : "Admin"}</span>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">Navigation</span>
          </li>

          {isAdmin ? (
            <>
              {AdminNavbar.map((element, key) => (
                <li className="nav-item menu-items" key={key}>
                  <Link className="nav-link" to={element.elementLink} replace>
                    <span className="menu-icon">
                      <i className={`mdi mdi-${element.iconClass}`}></i>
                    </span>
                    <span className="menu-title">{element.spanElement}</span>
                  </Link>
                </li>
              ))}
            </>
          ) : (
            NavbarItems.map((element, key) => (
              <li className="nav-item menu-items" key={key}>
                <Link className="nav-link" to={element.elementLink}>
                  <span className="menu-icon">
                    <i className={`mdi mdi-${element.iconClass}`}></i>
                  </span>
                  <span className="menu-title">{element.spanElement}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
