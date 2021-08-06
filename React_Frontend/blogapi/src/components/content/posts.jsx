import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import DarkContext from "./../../context/darkMode";
import { render } from "@testing-library/react";
import { ReactDOM } from "react-dom";

const Posts = ({ posts, getPostsByTag }) => {
  const userContext = useContext(UserContext);
  const darkContext = useContext(DarkContext);

  const renderTags = (tagList) => {
    /* <button
          onClick={getPostsByTag("latest")}
          className={
            darkContext.darkMode ? "badge badge-light" : "badge badge-dark"
          }
        >
          latest
        </button>
      */
    return tagList.map((tag) => (
      <button
        key={tag.id}
        onClick={() => getPostsByTag(tag.id)}
        className={"badge " + tag.styling}
      >
        {tag.name}
      </button>
    ));
  };

  const reactToPost = (postId, vote) => {
    console.log("reacted to " + postId + " with " + vote);
  };

  return (
    <main
      className={
        darkContext.darkMode ? "bg-dark dark-page-shadow " : "bg-light border"
      }
    >
      <div className="post-tags">
        {renderTags([
          { name: "latest", styling: "btn-primary", id: "Lat" },
          { name: "most popular", styling: "btn-success", id: "MPo" },
          { name: "least popular", styling: "btn-warning", id: "LPo" },
          { name: "oldest", styling: "btn-secondary", id: "Old" },
        ])}
      </div>

      <section
        className={
          darkContext.darkMode
            ? "posts-section-dark posts-section"
            : "posts-section"
        }
      >
        {posts &&
          posts.map((post) => {
            console.log(post.id);
            if (post.id < 9) {
            }
            return (
              <div
                className={
                  darkContext.darkMode ? `dark-page-shadow card ` : `card`
                }
                key={post.id}
              >
                <img
                  src="http://source.unsplash.com/random"
                  className="card-img-top"
                  alt={"Image for: " + post.title}
                />

                <p>
                  {post.title} {post.id}
                </p>
                <p>{post.rating}</p>

                <Link to={"/posts/" + post.slug} className="btn btn-info">
                  Read
                </Link>
              </div>
            );
          })}
      </section>
    </main>
  );
};

export default Posts;
