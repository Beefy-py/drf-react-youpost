import Header from "./components/content/header";
import Footer from "./components/content/footer";
import Body from "./components/content/body";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import React, { Component } from "react";
import RegisterForm from "./components/actions/registerForm";
import LoginForm from "./components/actions/loginForm";
import Logout from "./components/actions/logout";
import SearchPage from "./components/content/searchPage";
import CreatePost from "./components/actions/createPost";

import UserContext from "./context/userContext";
import DarkContext from "./context/darkMode";

import apiURL from "./apiUrl";
import axios from "axios";
import SearchBar from "./components/actions/searchBar";
import PostDetailWrapper from "./components/content/postDetailWrapper";
import NotFoundPage from "./components/content/notFoundPage";
import UpdatePost from "./components/actions/updatePost";
import DeletePost from "./components/actions/deletePost";
import Dashboard from "./components/content/dashboard";

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
    if (localStorage.getItem("refresh_token") === "undefined") {
      localStorage.removeItem("currentUser");
    }

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
              <PrivateRoute
                path="/posts/:slug"
                toggleShowSearchBar={this.toggleShowSearchBar}
                component={PostDetailWrapper}
              />
              <PrivateRoute
                path="/update-post/:slug"
                toggleShowSearchBar={this.toggleShowSearchBar}
                users={this.state.users}
                component={UpdatePost}
              />

              <PrivateRoute
                path="/delete-post/:slug"
                toggleShowSearchBar={this.toggleShowSearchBar}
                users={this.state.users}
                component={DeletePost}
              />

              <PrivateRoute
                path="/create-post"
                toggleShowSearchBar={this.toggleShowSearchBar}
                users={this.state.users}
                component={CreatePost}
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

              <PrivateRoute
                path="/logout"
                toggleShowSearchBar={this.toggleShowSearchBar}
                component={Logout}
              />

              <PrivateRoute
                exact
                path="/dashboard"
                toggleShowSearchBar={this.toggleShowSearchBar}
                component={Dashboard}
              />

              <PrivateRoute
                exact
                path="/"
                toggleShowSearchBar={this.toggleShowSearchBar}
                component={Body}
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

const PrivateRoute = ({
  component: Component,
  toggleShowSearchBar,
  users,
  ...rest
}) => {
  // Add your own authentication on the below line.

  const refreshToken =
    localStorage.getItem("refresh_token") === "undefined" ||
    localStorage.getItem("refresh_token") === null
      ? false
      : true;

  return (
    <Route
      {...rest}
      render={(props) =>
        refreshToken ? (
          <Component
            {...props}
            users={users}
            toggleShowSearchBar={toggleShowSearchBar}
          />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
