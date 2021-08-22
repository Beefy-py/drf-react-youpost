import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/userContext";
import DarkContext from "./../../context/darkMode";

const Header = () => {
  const userContext = useContext(UserContext);
  const darkContext = useContext(DarkContext);

  const refreshToken = localStorage.getItem("refresh_token");
  const accessToken = localStorage.getItem("access_token");

  const authorized =
    refreshToken === "undefined" || refreshToken === null ? false : true;

  const dropDownItemStyling = darkContext.darkMode
    ? "dropdown-item bg-dark text-light"
    : "dropdown-item bg-light";

  return (
    <nav
      className={
        darkContext.darkMode
          ? "navbar-dark bg-dark navbar navbar-expand-lg dark-page-shadow"
          : "navbar-light bg-light navbar navbar-expand-lg border"
      }
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand text-success" to="/">
          <b>YouPost</b>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/">
                Posts
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link active" to="/create-post">
                CreatePost
              </NavLink>
            </li> */}
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user-circle"></i>
                {authorized ? localStorage.getItem("currentUser") : "Guest"}
                {/*<i className="fas fa-crown"></i>*/}
              </NavLink>
              <ul
                className={
                  darkContext.darkMode
                    ? "dropdown-menu bg-dark"
                    : "dropdown-menu bg-light"
                }
                aria-labelledby="navbarDropdown"
              >
                {authorized ? (
                  <li>
                    <NavLink className={dropDownItemStyling} to="/logout">
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </NavLink>
                  </li>
                ) : (
                  <React.Fragment>
                    <li>
                      <NavLink className={dropDownItemStyling} to="/login">
                        <i className="fas fa-sign-in-alt"></i> Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className={dropDownItemStyling} to="/register">
                        <i className="fas fa-user-plus"></i> Register
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>
                <li>
                  <NavLink className={dropDownItemStyling} to="/">
                    <i className="fas fa-user-cog"></i> Settings
                  </NavLink>
                </li>
                <li
                  className={dropDownItemStyling + " dark-mode-toggler"}
                  onClick={darkContext.toggleDarkMode}
                >
                  {darkContext.darkMode ? (
                    <React.Fragment>
                      <i className="fas fa-sun"></i>
                      <span>Light</span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <i className="fas fa-moon"></i>
                      <span>Dark</span>
                    </React.Fragment>
                  )}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
