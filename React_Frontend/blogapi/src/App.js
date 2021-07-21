import Header from "./components/content/header";
import Footer from "./components/content/footer";
import Body from "./components/content/body";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import React, { Component } from "react";
import RegisterForm from "./components/actions/registerForm";
import LoginForm from "./components/actions/loginForm";
import Logout from "./components/actions/logout";
import PostDetail from "./components/content/postDetail";
import SearchPage from "./components/content/searchPage";

import UserContext from "./context/userContext";
import DarkContext from "./context/darkMode";

import apiURL from "./apiUrl";
import axios from "axios";
import SearchBar from "./components/actions/searchBar";
import PostDetailWrapper from "./components/content/postDetailWrapper";
import NotFoundPage from "./components/content/notFoundPage";

export default class App extends Component {
  state = {
    currentUser: { name: "" },
    users: [],
    darkMode: false,
    showSearchBar: true,
  };

  handleLoggedIn = (username) => {
    const user = { name: username };
    this.setState({ currentUser: user });
  };

  componentDidMount() {
    axios
      .get(apiURL + "user/list/")
      .then((res) => this.setState({ users: res.data }));

    if (18.5 < new Date().getHours() || new Date().getHours() < 7) {
      console.log("Going Dark");
      this.setState({ darkMode: true });
      this.makePageDark();
    }
  }

  getAuthorById = (pk) => {
    if (pk) {
      const userName = this.state.users.find((user) => user.id === pk)
        ? this.state.users.find((user) => user.id === pk).username
        : "Anonymous";
      return userName;
    }
  };

  toggleDarkMode = () => {
    this.setState({ darkMode: !this.state.darkMode });
    this.makePageDark();
  };

  toggleShowSearchBar = (boolInp) => {
    this.setState({ showSearchBar: boolInp });
  };

  makePageDark = () => {
    document.querySelector("html").className = !this.state.darkMode
      ? "dark-page-bg"
      : "";

    document.querySelector("body").className = !this.state.darkMode
      ? "dark-page-bg"
      : "";
  };

  render() {
    return (
      <DarkContext.Provider
        value={{
          darkMode: this.state.darkMode,
          toggleDarkMode: this.toggleDarkMode,
          background: "dark-bg",
        }}
      >
        <UserContext.Provider
          value={{
            currentUser: this.state.currentUser,
            onLogIn: this.handleLoggedIn,
            getAuthor: this.getAuthorById,
          }}
        >
          <Router>
            <Header />
            {this.state.showSearchBar ? <SearchBar /> : ""}
            <Switch>
              <Route
                path="/posts/:slug"
                render={(props) => (
                  <PostDetailWrapper
                    toggleShowSearchBar={this.toggleShowSearchBar}
                    {...props}
                  />
                )}
              />

              <Route
                path="/search/"
                render={(props) => <SearchPage {...props} />}
              />

              <Route
                path="/login"
                render={(props) => (
                  <LoginForm
                    toggleShowSearchBar={this.toggleShowSearchBar}
                    {...props}
                  />
                )}
              />
              <Route
                path="/register"
                render={(props) => (
                  <RegisterForm
                    toggleShowSearchBar={this.toggleShowSearchBar}
                    {...props}
                  />
                )}
              />
              <Route
                path="/logout"
                render={(props) => (
                  <Logout
                    toggleShowSearchBar={this.toggleShowSearchBar}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/"
                render={(props) => (
                  <Body
                    toggleShowSearchBar={this.toggleShowSearchBar}
                    {...props}
                  />
                )}
              />

              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </UserContext.Provider>
      </DarkContext.Provider>
    );
  }
}
