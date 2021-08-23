import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../baseAxios";
import UserContext from "./../../context/userContext";
import DarkContext from "./../../context/darkMode";
import history from "./../../history";

export default class DeletePost extends Component {
  componentDidMount() {
    this.props.toggleShowSearchBar(false);
    axiosInstance
      .get("posts/" + this.props.match.params.slug)
      .then((res) => this.setState({ post: res.data }));

    axiosInstance
      .get("user/list/" + this.state.currentUserId)
      .then((res) => this.setState({ currentUser: res.data }));
  }

  state = {
    post: {},
    currentUserId: JSON.parse(
      atob(localStorage.getItem("access_token").split(".")[1])
    ).user_id,
    currentUser: {},
  };

  performDelete = () => {
    axiosInstance.delete("delete-post/" + this.props.match.params.slug);
    this.props.history.replace("/dashboard");
    window.location.reload();
  };

  renderYesBtn = () => {
    const { post, currentUser, currentUserId } = this.state;

    if (currentUserId !== post.author) {
      if (currentUser.is_superuser) {
        return (
          <button
            className="btn btn-danger"
            onClick={() => this.performDelete()}
          >
            Yes
          </button>
        );
      }
      return "";
    }

    return (
      <button className="btn btn-danger" onClick={() => this.performDelete()}>
        Yes
      </button>
    );
  };

  render() {
    if (
      this.state.post.author ===
      JSON.parse(atob(localStorage.getItem("refresh_token").split(".")[1]))
        .user_id
    ) {
      console.log("neeee mag niet!!!");
    }
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
                  Are you sure you want to delete your post: [
                  {this.state.post.title}]?
                </p>
              )}
            </UserContext.Consumer>
            <div className="delete-post-action-wrapper">
              <button
                className={
                  darkContext.darkMode
                    ? "btn btn-outline-light"
                    : "btn btn-outline-dark"
                }
                //to={"/posts/" + this.state.post.slug}
                onClick={history.goBack}
              >
                No
              </button>
              {/* {this.state.post.author ===
              JSON.parse(
                atob(localStorage.getItem("refresh_token").split(".")[1])
              ).user_id ? (
                <button
                  className="btn btn-danger"
                  onClick={() => this.performDelete()}
                >
                  Yes
                </button>
              ) : (
                ""
              )} */}
              {this.renderYesBtn()}
            </div>
          </div>
        )}
      </DarkContext.Consumer>
    );
  }
}
