import React, { Component } from "react";
import { Link } from "react-router-dom";
import DarkContext from "../../context/darkMode";
import UserPostsWrapper from "./userPostsWrapper";

export default class Dashboard extends Component {
  render() {
    return (
      <DarkContext.Consumer>
        {(darkContext) => (
          <div className="dashboard">
            <div
              className={
                darkContext.darkMode
                  ? "user-info border bg-dark text-light"
                  : "user-info border bg-light"
              }
            >
              <h4>
                Sort of user profile for {localStorage.getItem("currentUser")}
              </h4>
            </div>
            <div
              className={
                darkContext.darkMode
                  ? "news border bg-dark text-light"
                  : "news border bg-light"
              }
            >
              <p>Notif new posts</p> <p>or subscribtions</p>
              <p>And other news </p>
            </div>
            <div className="user-posts">
              <div className="manage-user-posts">
                <Link to="/create-post">
                  Post <i className="fas fa-plus-square"></i>
                </Link>
              </div>
              <UserPostsWrapper
                toggleShowSearchBar={this.props.toggleShowSearchBar}
              ></UserPostsWrapper>
            </div>
          </div>
        )}
      </DarkContext.Consumer>
    );
  }
}
