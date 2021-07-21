import React, { useContext } from "react";
import axios from "axios";
import apiURL from "../../apiUrl";
import { useEffect, useState } from "react";
import DarkContext from "../../context/darkMode";
import UserContext from "../../context/userContext";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [posts, setPosts] = useState([]);
  const darkContext = useContext(DarkContext);
  const userContext = useContext(UserContext);

  useEffect(() => {
    axios.get(apiURL + "search/" + window.location.search).then((res) => {
      setPosts(res.data);
      console.log(res.data);
    });
  }, [setPosts]);

  return (
    <React.Fragment>
      {posts.length ? (
        <div
          className={
            darkContext.darkMode
              ? "posts-results-section dark-page-shadow text-light"
              : "posts-results-section border"
          }
        >
          {posts.map((post) => {
            const { title, id, author, published, excerpt } = post;
            return (
              <div className="post" key={id}>
                <Link to={"/posts/" + post.slug}>
                  <h3> {title}</h3>
                </Link>
                <div>
                  <p className="author">
                    {author ? userContext.getAuthor(post.author) : "Anonymous"}
                  </p>

                  <p className="date">
                    <span className="vertical-line">&#124;</span>
                    {new Intl.DateTimeFormat("en-GB", {
                      dateStyle: "full",
                    }).format(new Date(published))}
                  </p>
                </div>
                <hr />
                <p>
                  {excerpt.substring(0, 150) + "..."}{" "}
                  <Link to={"/posts/" + post.slug}>
                    {" "}
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className={
            +darkContext.darkMode
              ? "no-results dark-page-shadow text-light"
              : "no-results border bg-light"
          }
        >
          <h3>
            No Results <i class="fas fa-folder-open"></i>!
          </h3>
        </div>
      )}
    </React.Fragment>
  );
};

export default SearchPage;
