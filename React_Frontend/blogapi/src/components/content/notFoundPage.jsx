import React, { Component } from "react";
import { Link } from "react-router-dom";
import DarkContext from "./../../context/darkMode";

export default class NotFoundPage extends Component {
  componentDidMount() {
    this.props.toggleShowSearchBar(false);
  }

  render() {
    return (
      <DarkContext.Consumer>
        {(darkContext) => (
          <div
            className={
              darkContext.darkMode
                ? "container-404 bg-dark dark-page-shadow text-light"
                : "container-404 border"
            }
          >
            <div className="error-404">
              <h1>
                4<i className="fas fa-cog"></i>4!
              </h1>
              <p>
                Sorry but, the content you are trying to access doesn't exist.
                We'll send you a link to go...
              </p>
              <Link to="/dashboard">
                <i className="fas fa-hand-point-left"></i> Back Home
              </Link>
            </div>
          </div>
        )}
      </DarkContext.Consumer>
    );
  }
}
