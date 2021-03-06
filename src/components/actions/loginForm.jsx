import Form from "../common/form";
import Joi from "joi-browser";
import React from "react";
import UserContext from "../../context/userContext";
import apiURL from "../../apiUrl";
import axiosInstance from "../../baseAxios";
import DarkContext from "../../context/darkMode";
import { Link } from "react-router-dom";

export default class LoginForm extends Form {
  static contextType = UserContext;

  componentDidMount() {
    this.context.onLogIn("Guest");
    this.props.toggleShowSearchBar(false);
  }

  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
  };

  afterSubmit = () => {
    axiosInstance
      .post(apiURL + "token/", {
        username: this.state.data.username,
        password: this.state.data.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");

        /*set user to current user */
        this.context.onLogIn(this.state.data.username);
        localStorage.setItem("currentUser", this.state.data.username);
        this.props.history.replace("/dashboard");
      })
      .catch((response) => {
        console.log(response.response);
        const errorText = response.response.data.detail
          ? "username or password incorrect"
          : "";

        const errors401 = { username: errorText, password: errorText };
        this.setState({ errors: errors401 });
      });
  };

  afterChange(input) {}

  render() {
    return (
      <DarkContext.Consumer>
        {(darkContext) => (
          <div
            className={
              "form-container border " +
              `${darkContext.darkMode ? "bg-dark text-light" : "bg-light"}`
            }
          >
            <h1>Login</h1>
            <form action="" onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login")}
            </form>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        )}
      </DarkContext.Consumer>
    );
  }
}
