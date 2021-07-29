import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import history from "./../../history";

export default class UserPosts extends Component {
  render() {
    const { posts } = this.props;

    return (
      <React.Fragment>
        {posts &&
          posts.map((post) => (
            <div key={post.id} className="user-post">
              <div className="info">
                <Link to={"/posts/" + post.slug}>{post.title}</Link>
                <p>{post.published}</p>
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
          ))}
      </React.Fragment>
    );
  }
}
