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
  }

  state = {
    post: {},
  };

  performDelete = () => {
    axiosInstance.delete("delete-post/" + this.props.match.params.slug);
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
                  Are you sure you want to delete your post: [
                  {this.state.post.title}]?
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
                //to={"/posts/" + this.state.post.slug}
                onClick={history.goBack}
              >
                No
              </Link>
              <Link
                className="btn btn-danger"
                to="/"
                onClick={() => this.performDelete()}
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
