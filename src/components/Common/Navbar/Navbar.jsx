import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img3 from "../../../img/home/Ellipse 116.png";
import img6 from "../../../img/home/noun-stream-4701152.png";
import img7 from "../../../img/home/noun-stream-play-5240252.png";

import img9 from "../../../img/home/Group 1329.png";
import img13 from "../../../img/home/log.png";

import { UilSearch } from "@iconscout/react-unicons";
import "./Navbar.css";
import { useContext } from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useAdmin from "../../../hooks/useAdmin";
import { AuthContext } from "../../../contexts/UserProvider";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const { admin } = useAdmin();
  console.log(admin);
  const location = useLocation();
  const navigate = useNavigate();
  // const handleLogOut = () => {
  //   // Clear localStorage and reset user state
  //   logoutUser();
  //   navigate("/signup"); // Redirect to signin page after logout
  // };
  console.log(user);

  const handleLogOut = () => {
    logoutUser();

    navigate("/signup");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (location.pathname === "/signup") {
    return null;
  }
  return (
    <div>
      <div className="wrapper">
        <nav className="main-header navbar navbar-expand">
          {/* Left navbar links */}
          <div className="nav_design ms-3">
            <ul className="navbar-nav" style={{ marginTop: -6 }}>
              <div className="navbar_bar">
                <li className="nav-link">
                  <a
                    className="nav-link"
                    data-widget="pushmenu"
                    href="#"
                    role="button"
                  >
                    <i className="fas fa-bars bars_1" />
                  </a>
                </li>
              </div>
            </ul>
            <ul
              style={{ zIndex: 1 }}
              className="nav navbar-nav navbar-right nav_bar_icons menu_right_li"
            >
              <li className="new_invoice_top_menu_link_li">
                <div className="logoSearch">
                  <div className="search">
                    <input type="text" placeholder="Search here" />
                    <div className="s-icon">
                      <UilSearch />
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <ul className="navbar-nav ml-lg-auto">
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <img src={img3} className="profile_image" alt="" />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
              </div>
              {/* <div className="d-flex mt-lg-3">
                {" "}
                <li className="">
                  <a onClick={handleLogOut} style={{ cursor: "pointer" }}>
                    <img
                      src={img}
                      className="log_out_sm"
                      alt=""
                      style={{ marginTop: -2 }}
                    />
                  </a>
                </li>
                <li className="ms-2">
                  <a className="log_out_sm">
                    <span
                      className="navbar_span me-2 "
                      style={{ fontWeight: 600 }}
                    >
                      {" "}
                      Admin
                    </span>

                    <img src={img2} alt="" />
                  </a>

               
                </li>
              </div>

              <div className="mt-lg-3">
                <img src={img3} className="profile_image" alt="" />
              </div> */}
            </ul>
          </div>
          {/* Right navbar links */}
        </nav>

        <aside
          className="main-sidebar sidebar-dark-primary elevation-4 side_menubar"
          // style={{
          //   position: "fixed",
          // }}
        >
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div>
              <h6 className="navbar_logo_text text-center my-4">LOGO</h6>
            </div>

            {/* SidebarSearch Form */}
            {/* <div className="form-inline">
              <div className="input-group" data-widget="sidebar-search">
                <input
                  className="form-control form-control-sidebar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ background: "white" }}
                />
                <div className="input-group-append">
                  <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw" />
                  </button>
                </div>
              </div>
            </div> */}
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column myDIV"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <Link to={"/"}>
                  <li className="main_nav-link">
                    <a href="/" className="nav-link">
                      <i class="fa-sharp fa-solid fa-house span_text2"></i>

                      <div className="menu_flex">
                        <span className="span_text">Home</span>
                      </div>
                    </a>
                  </li>
                </Link>
                {user && user.role === "user" ? (
                  <Link to={"/order"}>
                    <li className="main_nav-link">
                      <a href="/order" className="nav-link">
                        <i class="fa-sharp fa-solid fa-house span_text2"></i>

                        <div className="menu_flex">
                          <span className="span_text">Order</span>
                        </div>
                      </a>
                    </li>
                  </Link>
                ) : (
                  ""
                )}
                {(user && user.role === "admin") || user.role === "manager" ? (
                  <>
                    <Link to={"/add_manager"}>
                      <li className="main_nav-link">
                        <a href="/add_manager" className="nav-link">
                          <i class="fa-sharp fa-solid fa-building-columns span_text2"></i>
                          <div className="menu_flex">
                            <span className="span_text">Add Manager</span>
                          </div>
                        </a>
                      </li>
                    </Link>
                    <Link to={"/manager_list"}>
                      <li className="main_nav-link">
                        <a href="/manager_list" className="nav-link">
                          <img style={{ width: 16 }} src={img6} alt="" />
                          <div className="menu_flex">
                            <span className="span_text">Manager List</span>
                          </div>
                        </a>
                      </li>
                    </Link>

                    <Link to={"/add_category"}>
                      <li className="main_nav-link">
                        <a href="/add_category" className="nav-link">
                          <i class="fa-sharp fa-solid fa-building-columns span_text2"></i>
                          <div className="menu_flex">
                            <span className="span_text">Add Category</span>
                          </div>
                        </a>
                      </li>
                    </Link>
                    <Link to={"/category_list"}>
                      <li className="main_nav-link">
                        <a href="/category_list" className="nav-link">
                          <img style={{ width: 16 }} src={img6} alt="" />
                          <div className="menu_flex">
                            <span className="span_text">Category List</span>
                          </div>
                        </a>
                      </li>
                    </Link>
                    <Link to={"/add_branch"}>
                      <li className="main_nav-link">
                        <a href="/add_branch" className="nav-link">
                          <i class="fa-sharp fa-solid fa-building-columns span_text2"></i>
                          <div className="menu_flex">
                            <span className="span_text">Add Branch</span>
                          </div>
                        </a>
                      </li>
                    </Link>
                    <Link to={"/branch_list"}>
                      <li className="main_nav-link">
                        <a href="/branch_list" className="nav-link">
                          <img style={{ width: 16 }} src={img6} alt="" />
                          <div className="menu_flex">
                            <span className="span_text">Branch List</span>
                          </div>
                        </a>
                      </li>
                    </Link>
                    <Link to={"/add_facility"}>
                      <li className="main_nav-link">
                        <a href="/add_facility" className="nav-link">
                          <i class="fa-sharp fa-solid fa-building-columns span_text2"></i>
                          <div className="menu_flex">
                            <span className="span_text">Add Facility</span>
                          </div>
                        </a>
                      </li>
                    </Link>
                    <Link to={"/facility_list"}>
                      <li className="main_nav-link">
                        <a href="/facility_list" className="nav-link">
                          <img style={{ width: 16 }} src={img6} alt="" />
                          <div className="menu_flex">
                            <span className="span_text">Facility List</span>
                          </div>
                        </a>
                      </li>
                    </Link>

                    <Link to={"/add_property"}>
                      <li className="main_nav-link">
                        <a href="/add_property" className="nav-link">
                          <img
                            style={{ width: 16, color: "red" }}
                            src={img7}
                            alt=""
                          />
                          <div className="menu_flex">
                            <span className="span_text">Add Property</span>
                          </div>
                        </a>
                      </li>
                    </Link>
                    <Link to={"/property_list"}>
                      <li className="main_nav-link">
                        <a href="/property_list" className="nav-link">
                          <i class="fa-solid fa-grip-lines span_text2"></i>
                          <div className="menu_flex">
                            <span className="span_text">Property List</span>
                          </div>
                        </a>
                      </li>
                    </Link>
                    <Link to={"/add_seat"}>
                      <li className="main_nav-link">
                        <a href="/add_seat" className="nav-link">
                          <i class="fa-sharp fa-solid fa-building-columns span_text2"></i>
                          <div className="menu_flex">
                            <span className="span_text">Add Seat</span>
                          </div>
                        </a>
                      </li>
                    </Link>
                    <Link to={"/seat_list"}>
                      <li className="main_nav-link">
                        <a href="/seat_list" className="nav-link">
                          <img style={{ width: 16 }} src={img6} alt="" />
                          <div className="menu_flex">
                            <span className="span_text">Seat List</span>
                          </div>
                        </a>
                      </li>
                    </Link>
                    <Link to={"/add_promo"}>
                      <li className="main_nav-link">
                        <a href="/add_promo" className="nav-link">
                          <img style={{ width: 16 }} src={img7} alt="" />
                          <div className="menu_flex">
                            <span className="span_text">Add Promo</span>
                          </div>
                        </a>
                      </li>
                    </Link>
                    <Link to={"/promo_list"}>
                      <li className="main_nav-link">
                        <a href="/promo_list" className="nav-link">
                          <i class="fa-solid fa-grip-lines span_text2"></i>
                          <div className="menu_flex">
                            <span className="span_text">Promo List</span>
                          </div>
                        </a>
                      </li>
                    </Link>
                    <Link to={"/add_recommended"}>
                      <li className="main_nav-link">
                        <a href="/add_recommended" className="nav-link">
                          <img style={{ width: 16 }} src={img7} alt="" />
                          <div className="menu_flex">
                            <span className="span_text">Add Recommended</span>
                          </div>
                        </a>
                      </li>
                    </Link>
                    <Link to={"/recommended_list"}>
                      <li className="main_nav-link">
                        <a href="/recommended_list" className="nav-link">
                          <i class="fa-solid fa-grip-lines span_text2"></i>
                          <div className="menu_flex">
                            <span className="span_text">Recommended List</span>
                          </div>
                        </a>
                      </li>
                    </Link>
                    <Link to={"/orders"}>
                      <li className="main_nav-link">
                        <a href="/order" className="nav-link">
                          <img style={{ width: 16 }} src={img9} alt="" />
                          <div className="menu_flex">
                            <span className="span_text">Orders</span>
                          </div>
                        </a>
                      </li>
                    </Link>
                  </>
                ) : (
                  ""
                )}

                <li className="main_nav-link password_sm">
                  <a className="nav-link" onClick={handleLogOut}>
                    <img style={{ width: 16 }} src={img13} alt="" />
                    <div className="menu_flex">
                      <span className="span_text">Log Out</span>
                    </div>
                  </a>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    </div>
  );
};

export default Navbar;
