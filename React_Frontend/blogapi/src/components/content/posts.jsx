import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import DarkContext from "./../../context/darkMode";
import { render } from "@testing-library/react";

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
          { name: "most upvotes", styling: "btn-info", id: "MUp" },
          { name: "least upvotes", styling: "btn-danger", id: "LUp" },
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
          posts.map((post) => (
            <div
              className={
                darkContext.darkMode ? "dark-page-shadow card" : "card"
              }
              key={post.id}
            >
              <img
                src="http://source.unsplash.com/random"
                className="card-img-top"
                alt={"Image for: " + post.title}
              />
              <div
                className={
                  darkContext.darkMode
                    ? "card-body bg-dark text-light"
                    : "card-body bg-light text-dark"
                }
              >
                <h5 className="card-title text-info">
                  <Link to={"/posts/" + post.slug}>
                    <b> {post.title}</b>
                  </Link>
                </h5>
                <p>
                  <span
                    className={
                      darkContext.darkMode
                        ? "date-posted text-light"
                        : "date-posted text-dark"
                    }
                  ></span>
                  <br />
                  <span
                    className={
                      darkContext.darkMode ? "text-light" : "text-dark"
                    }
                  >
                    <b>
                      {post.author
                        ? userContext.getAuthor(post.author)
                        : "Anonymous"}
                    </b>
                  </span>
                </p>
                <p className="card-text">
                  {post.excerpt.substring(0, 150) + "..."}
                </p>
                <Link to={"/posts/" + post.slug} className="btn btn-info">
                  more...
                </Link>
              </div>
            </div>
          ))}
      </section>
    </main>
  );
};

export default Posts;
