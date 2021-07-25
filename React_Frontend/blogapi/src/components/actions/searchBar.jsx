import React, { Component } from "react";
import DarkContext from "../../context/darkMode";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import apiURL from "../../apiUrl";

class SearchBar extends Component {
  state = {
    searchValue: "",
    searchResults: [],
  };

  componentDidMount() {}

  handleChange = (e) => {
    e.preventDefault();

    this.setState({ searchValue: e.target.value });

    if (e.target.value !== "") {
      axios.get(apiURL + "search/?search=" + e.target.value).then((res) => {
        console.log(res.data);
        this.setState({ searchResults: res.data });
      });
    }
  };

  goSearch = (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/search/",
      search: "?search= " + this.state.searchValue,
    });

    window.location.reload();
  };

  render() {
    const { searchResults, searchValue } = this.state;

    return (
      <DarkContext.Consumer>
        {(darkContext) => (
          <React.Fragment>
            <form className="form-inline searchbar" onSubmit={this.goSearch}>
              <input
                className={
                  darkContext.darkMode
                    ? "form-control bg-dark text-light"
                    : "form-control"
                }
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={this.handleChange}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <div style={{ width: "90%", margin: "0rem auto" }}>
              <ul className="posts-results-on-change list-group list-group-flush dark-page-shadow">
                {searchResults && searchValue
                  ? searchResults.map((post) => (
                      <li
                        className={
                          darkContext.darkMode
                            ? "list-group-item bg-dark text-light"
                            : "list-group-item"
                        }
                        key={post.id}
                      >
                        <i className="fas fa-search-plus"></i>{" "}
                        <p>{post.title}</p>
                      </li>
                    ))
                  : ""}
              </ul>
            </div>
          </React.Fragment>
        )}
      </DarkContext.Consumer>
    );
  }
}

export default withRouter(SearchBar);
