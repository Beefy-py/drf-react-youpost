import React, { Component } from "react";
import UserPostsWrapper from "./userPostsWrapper";

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <h4>Sort of user profile for {localStorage.getItem("currentUser")}</h4>
        <UserPostsWrapper
          toggleShowSearchBar={this.props.toggleShowSearchBar}
        ></UserPostsWrapper>
      </React.Fragment>
    );
  }
}
