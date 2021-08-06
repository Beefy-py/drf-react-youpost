import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../baseAxios";
import UserContext from "./../../context/userContext";
import DarkContext from "./../../context/darkMode";

export default class Logout extends Component {
  componentDidMount() {
    this.props.toggleShowSearchBar(false);
  }

  performLogout = () => {
    const response = axiosInstance.post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("currentUser");

    axiosInstance.defaults.headers["Authorization"] = null;
    console.log("logged out", response);
  };
  render() {
    return (
      <DarkContext.Consumer>
        {(darkContext) => (
          <div
            className={
              "logout border " +
              `${darkContext.darkMode ? "bg-dark text-light" : "bg-light"}`
            }
          >
            <UserContext.Consumer>
              {(userContext) => (
                <p>
                  Are you sure you want perform a logout for
                  {userContext.currentUser
                    ? userContext.currentUser.name
                    : "Anonymous"}
                  ?
                </p>
              )}
            </UserContext.Consumer>
            <div className="logout-action-wrapper">
              <Link
                className={
                  darkContext.darkMode
                    ? "btn btn-outline-light"
                    : "btn btn-outline-dark"
                }
                to="/dashboard"
              >
                No
              </Link>
              <Link
                className="btn btn-danger"
                to="/login"
                onClick={() => this.performLogout()}
              >
                Yes
              </Link>
            </div>
          </div>
        )}
      </DarkContext.Consumer>
    );
  }
}
