import React, { Component } from "react";
import DarkContext from "../../context/darkMode";
import { withRouter } from "react-router-dom";

class SearchBar extends Component {
  state = {
    searchValue: "",
  };

  componentDidMount() {}

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ searchValue: e.target.value });
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
    return (
      <DarkContext.Consumer>
        {(darkContext) => (
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
        )}
      </DarkContext.Consumer>
    );
  }
}

export default withRouter(SearchBar);
