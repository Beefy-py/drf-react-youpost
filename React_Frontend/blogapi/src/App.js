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
import axiosInstance from "./baseAxios";
import AdminPage from "./components/admin/adminPage";

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
    console.log(axiosInstance.defaults.headers["Authorization"]);
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken === "undefined" || refreshToken === null) {
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

  getAuthorImage = (pk) => {
    if (pk) {
      const user = this.state.users.find((user) => user.id === pk);
      console.log("getting user:  --->", user);
      return user.image;
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
            getAuthorImage: this.getAuthorImage,
          }}
        >
          <Router>
            <Header />
            {this.state.showSearchBar ? <SearchBar /> : ""}
            <Switch>
              <PrivateAdminRoute
                path="/admin"
                toggleShowSearchBar={this.toggleShowSearchBar}
                users={this.state.users}
                component={AdminPage}
              />

              <IsAuthenticatedRoute path="/search" component={SearchPage} />
              <IsAuthenticatedRoute
                path="/posts/:slug"
                toggleShowSearchBar={this.toggleShowSearchBar}
                component={PostDetailWrapper}
              />
              <IsAuthenticatedRoute
                path="/update-post/:slug"
                toggleShowSearchBar={this.toggleShowSearchBar}
                users={this.state.users}
                component={UpdatePost}
              />
              <IsAuthenticatedRoute
                path="/delete-post/:slug"
                toggleShowSearchBar={this.toggleShowSearchBar}
                users={this.state.users}
                component={DeletePost}
              />
              <IsAuthenticatedRoute
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
              <IsAuthenticatedRoute
                path="/logout"
                toggleShowSearchBar={this.toggleShowSearchBar}
                component={Logout}
              />
              <IsAuthenticatedRoute
                exact
                path="/dashboard"
                toggleShowSearchBar={this.toggleShowSearchBar}
                component={Dashboard}
              />
              <IsAuthenticatedRoute
                exact
                path="/"
                toggleShowSearchBar={this.toggleShowSearchBar}
                component={Body}
              />
              <Route path="*">
                <NotFoundPage toggleShowSearchBar={this.toggleShowSearchBar} />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </UserContext.Provider>
      </DarkContext.Provider>
    );
  }
}

const IsAuthenticatedRoute = ({
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

const PrivateAdminRoute = ({
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
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) return <Redirect to={"/"} />;

  const currentUserId = JSON.parse(atob(accessToken.split(".")[1])).user_id;

  const user = users.filter((user) => user.id === currentUserId)[0];

  if (user) {
    return (
      <Route
        {...rest}
        render={(props) =>
          refreshToken && user.is_superuser ? (
            <Component
              {...props}
              users={users}
              toggleShowSearchBar={toggleShowSearchBar}
            />
          ) : (
            <Redirect
              to={{ pathname: "/not-allowed", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
  return null;
};
