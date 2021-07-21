import React, { Component } from "react";
import UserContext from "../../context/userContext";
import DarkContext from "./../../context/darkMode";

export default class PostDetail extends Component {
  render() {
    console.log(this.props);
    const { title, author, content, published } = this.props.post;

    return (
      <DarkContext.Consumer>
        {(darkContext) => (
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
            <UserContext.Consumer>
              {(userContext) => (
                <span>
                  posted by{" "}
                  <p>{author ? userContext.getAuthor(author) : "Anonymous"}</p>
                  <p>
                    {published
                      ? new Intl.DateTimeFormat("en-GB", {
                          dateStyle: "full",
                        }).format(new Date(published))
                      : "no time"}
                  </p>
                </span>
              )}
            </UserContext.Consumer>
            <hr />

            <div className="post-content">content={content}</div>
          </article>
        )}
      </DarkContext.Consumer>
    );
  }
}
