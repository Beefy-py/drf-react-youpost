import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import DarkContext from "./../../context/darkMode";

const Posts = ({ posts }) => {
  const userContext = useContext(UserContext);
  const darkContext = useContext(DarkContext);

  return (
    <main
      className={
        darkContext.darkMode ? "bg-dark dark-page-shadow " : "bg-light border"
      }
    >
      <div className="post-tags">
        <span
          className={
            darkContext.darkMode ? "badge badge-light" : "badge badge-dark"
          }
        >
          latest
        </span>
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
              className={darkContext.darkMode ? "card-dark" : "card"}
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
                    : '"card-body bg-light text-dark"'
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
                  >
                    <i>
                      {new Intl.DateTimeFormat("en-GB", {
                        dateStyle: "full",
                      }).format(new Date(post.published))}
                    </i>
                  </span>
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
