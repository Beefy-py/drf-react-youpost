import React, { useContext } from "react";
import DarkContext from "../../context/darkMode";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const darkContext = useContext(DarkContext);
  return (
    <div
      className={
        darkContext.darkMode
          ? "container-404 dark-page-shadow text-light"
          : "container-404 border"
      }
    >
      <div className="error-404">
        <h1>
          4<i class="fas fa-cog"></i>4!
        </h1>
        <p>
          Sorry but, the content you are trying to access doesn't exist. We'll
          send you a link to go...
        </p>
        <Link to="/">
          <i class="fas fa-hand-point-left"></i> Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
