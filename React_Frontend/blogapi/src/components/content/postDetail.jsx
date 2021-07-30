import React, { Component } from "react";
import UserContext from "../../context/userContext";
import DarkContext from "./../../context/darkMode";
import { Link } from "react-router-dom";

export default class PostDetail extends Component {
  render() {
    const { title, slug, author, content, published } = this.props.post;

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
