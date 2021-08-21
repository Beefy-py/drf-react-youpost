import React, { Component } from "react";
import UserContext from "../../context/userContext";
import DarkContext from "./../../context/darkMode";
import { Link } from "react-router-dom";

export default class PostDetail extends Component {
  render() {
    const { title, image, slug, author, content, published } = this.props.post;

    const accessToken = localStorage.getItem("access_token");
    const currentUserId = JSON.parse(atob(accessToken.split(".")[1])).user_id;

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
                    className={
                      darkContext.darkMode
                        ? "post-content"
                        : "post-content text-dark"
                    }
                  >
                    {content}
                  </div>

                  <React.Fragment>
                    {author === currentUserId ? (
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
                    )}
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
