import React, { Component } from "react";
import UserContext from "../../context/userContext";
import DarkContext from "./../../context/darkMode";
import { Link } from "react-router-dom";

export default class PostDetail extends Component {
  render() {
    const { title, slug, author, content, published } = this.props.post;

    const refreshToken = localStorage.getItem("refresh_token");
    const currentUserId = JSON.parse(atob(refreshToken.split(".")[1])).user_id;

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
                <div>
                  {author === currentUserId ? (
                    <React.Fragment>
                      <Link to={"/update-post/" + slug}>Update</Link>
                      <Link to={"/delete-post/" + slug}>Delete</Link>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </div>
                <div className="post-img-title">
                  <img
                    src="http://source.unsplash.com/random"
                    className="card-img-top"
                    alt={"Image for: " + title}
                  />
                  <h1>{title}</h1>
                </div>
                <span>
                  <p>{userContext.getAuthor(author)}</p>
                  <p>
                    {published
                      ? new Intl.DateTimeFormat("en-GB", {
                          dateStyle: "full",
                        }).format(new Date(published))
                      : ""}
                  </p>
                </span>

                <hr />
                <div className="post-content">{content}</div>
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
