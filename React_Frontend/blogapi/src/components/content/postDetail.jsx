import React, { Component } from "react";
import UserContext from "../../context/userContext";
import DarkContext from "./../../context/darkMode";
import { Link } from "react-router-dom";
import axiosInstance from "./../../baseAxios";

export default class PostDetail extends Component {
  state = {
    currentUserId: JSON.parse(
      atob(localStorage.getItem("access_token").split(".")[1])
    ).user_id,
    postAuthorId: this.props.post.author,
    currentUser: {},
    comments: [],
  };

  componentDidMount() {
    axiosInstance
      .get("user/list/" + this.state.currentUserId)
      .then((res) => this.setState({ currentUser: res.data }));
  }

  renderUpDel = () => {
    const { currentUserId, postAuthorId, currentUser } = this.state;
    const { slug } = this.props.post;

    if (currentUserId !== postAuthorId) {
      if (currentUser.is_superuser) {
        console.log("admin has right to delete post.");
        return (
          <div className="actions">
            <Link to={"/update-post/" + slug}>
              <i className="fas fa-wrench"></i>
            </Link>
            <Link to={"/delete-post/" + slug}>
              <i className="fas fa-trash-alt"></i>
            </Link>
          </div>
        );
      }
      return "";
    }

    return (
      <div className="actions">
        <Link to={"/update-post/" + slug}>
          <i className="fas fa-wrench"></i>
        </Link>
        <Link to={"/delete-post/" + slug}>
          <i className="fas fa-trash-alt"></i>
        </Link>
      </div>
    );
  };

  render() {
    const { title, image, author, content, published } = this.props.post;

    const accessToken = localStorage.getItem("access_token");

    return this.props.post ? (
      <DarkContext.Consumer>
        {(darkContext) => (
          <UserContext.Consumer>
            {(userContext) => (
              <article
                className={
                  darkContext.darkMode
                    ? "post-container text-light"
                    : "post-container"
                }
              >
                <div
                  className={
                    darkContext.darkMode
                      ? "dark-page-shadow post-img-title"
                      : "post-img-title"
                  }
                >
                  <h1>{title}</h1>

                  <img
                    src={image}
                    className="card-img-top"
                    alt={"Image for: " + title}
                  />
                </div>
                <div
                  className={
                    darkContext.darkMode
                      ? "post-body dark-page-shadow border bg-dark"
                      : "post-body border bg-light"
                  }
                >
                  <span>
                    <p>{userContext.getAuthor(author)} published on</p>
                    <p>
                      {published
                        ? new Intl.DateTimeFormat("en-GB", {
                            dateStyle: "full",
                          }).format(new Date(published))
                        : ""}
                    </p>
                  </span>
                  <hr />
                  <div
                    style={{ whiteSpace: "pre-wrap" }}
                    className={
                      darkContext.darkMode
                        ? "post-content"
                        : "post-content text-dark"
                    }
                  >
                    {content}
                  </div>

                  <React.Fragment>
                    {/* {author === currentUserId ? (
                      <div className="actions">
                        <Link to={"/update-post/" + slug}>
                          <i className="fas fa-wrench"></i>
                        </Link>
                        <Link to={"/delete-post/" + slug}>
                          <i className="fas fa-trash-alt"></i>
                        </Link>
                      </div>
                    ) : (
                      ""
                    )} */}
                    {this.renderUpDel()}
                  </React.Fragment>
                </div>
                <div
                  className={
                    darkContext.darkMode
                      ? "comments dark-page-shadow border bg-dark"
                      : "comments border bg-light"
                  }
                >
                  Comments
                </div>
              </article>
            )}
          </UserContext.Consumer>
        )}
      </DarkContext.Consumer>
    ) : (
      ""
    );
  }
}
