import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/userContext";
import DarkContext from "./../../context/darkMode";

const Header = () => {
  const userContext = useContext(UserContext);
  const darkContext = useContext(DarkContext);

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
      style={{ position: "sticky !important" }}
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
              <NavLink className="nav-link active" to="/">
                Posts
              </NavLink>
            </li>
            <li className="nav-item dark-mode-toggler">
              <i onClick={darkContext.toggleDarkMode}>
                {darkContext.darkMode ? (
                  <i className="fas fa-moon"></i>
                ) : (
                  <i className="fas fa-sun"></i>
                )}
              </i>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {localStorage.getItem("access_token")
                  ? localStorage.getItem("currentUser") ||
                    userContext.currentUser.name
                  : "Guest"}
              </NavLink>
              <ul
                className={
                  darkContext.darkMode
                    ? "dropdown-menu bg-dark"
                    : "dropdown-menu bg-light"
                }
                aria-labelledby="navbarDropdown"
              >
                {localStorage.getItem("access_token") ? (
                  <li>
                    <NavLink className={dropDownItemStyling} to="/logout">
                      Logout
                    </NavLink>
                  </li>
                ) : (
                  <React.Fragment>
                    <li>
                      <NavLink className={dropDownItemStyling} to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className={dropDownItemStyling} to="/register">
                        Register
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}

                <li>
                  <hr className="dropdown-divider"></hr>
                </li>
                <li>
                  <NavLink className={dropDownItemStyling} to="/">
                    Settings
                  </NavLink>
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
