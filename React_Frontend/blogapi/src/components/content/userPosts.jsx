import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import history from "./../../history";
import DarkContext from "./../../context/darkMode";

export default class UserPosts extends Component {
  render() {
    const { posts } = this.props;

    return (
      <React.Fragment>
        {posts &&
          posts.map((post) => (
            <DarkContext.Consumer key={post.id}>
              {(darkContext) => (
                <div
                  key={post.id}
                  className={
                    darkContext.darkMode
                      ? "user-post dark-page-shadow bg-dark"
                      : "user-post border bg-light"
                  }
                >
                  <div className="title">
                    <Link
                      to={"/posts/" + post.slug}
                      className={
                        darkContext.darkMode ? "text-light" : "text-dark"
                      }
                    >
                      {post.title.length >= 20
                        ? post.title.substring(0, 20) + "..."
                        : post.title}
                    </Link>
                  </div>
                  <div className="published">
                    {new Intl.DateTimeFormat("en-GB", {
                      dateStyle: "full",
                    }).format(new Date(post.published))}
                  </div>
                  <div className="actions">
                    <Link to={"/update-post/" + post.slug}>
                      <i className="fas fa-wrench"></i>
                    </Link>
                    <Link to={"/delete-post/" + post.slug}>
                      <i className="fas fa-trash-alt"></i>
                    </Link>
                  </div>
                </div>
              )}
            </DarkContext.Consumer>
          ))}
      </React.Fragment>
    );
  }
}
