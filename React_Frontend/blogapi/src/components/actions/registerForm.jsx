import Form from "../common/form";
import Joi, { ref } from "joi-browser";
import React from "react";
import apiURL from "../../apiUrl";
import axiosInstance from "axios";
import DarkContext from "./../../context/darkMode";
import { Link } from "react-router-dom";

export default class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      username: "",
      /*firstname: "",
      lastname: "",*/
    },
    errors: {},
    // joi: "",
  };

  componentDidMount() {
    this.props.toggleShowSearchBar(false);

    // const BaseJoi = require("joi-browser");
    // const ImageExtension = require("joi-image-extension");

    // const Joi = BaseJoi.extend(ImageExtension);
    // this.setState({ joi: Joi });
  }

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    repeatPassword: ref("password"),
    username: Joi.string().required().label("Username"),
    /*firstname: Joi.string().required().label("Firstname"),
    lastname: Joi.string().required().label("Lastname"),*/
  };

  afterSubmit = () => {
    axiosInstance
      .post(apiURL + "user/register/", {
        email: this.state.data.email,
        username: this.state.data.username,
        first_name: this.state.data.firstname,
        last_name: this.state.data.lastname,
        password: this.state.data.password,
      })
      .then((res) => {
        this.props.history.replace("/");
        window.location.reload();
      });
    console.log("Registered!");
  };

  afterChange = (input) => {};

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
            <h1>Register</h1>
            <form action="" onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email")}
              {this.renderInput("username", "Username")}
              {/*  {this.renderInput("firstname", "Firstname")}
              {this.renderInput("lastname", "Lastname")} */}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput(
                "repeatPassword",
                "Repeat Password",
                "password"
              )}
              {this.renderButton("Register")}
            </form>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        )}
      </DarkContext.Consumer>
    );
  }
}
