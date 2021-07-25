import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import DarkContext from "../../context/darkMode";
import axios from "axios";
import apiURL from "../../apiUrl";
import axiosInstance from "./../../baseAxios";

export default class CreatePost extends Form {
  componentDidMount() {
    this.props.toggleShowSearchBar(false);
  }

  state = {
    data: { title: "", excerpt: "", content: "" },
    errors: {},
  };

  schema = {
    title: Joi.string().required().min(10).max(80).label("Title"),
    excerpt: Joi.string().required().min(50).label("Excerpt"),
    content: Joi.string().required().min(100).label("Content"),
  };

  afterSubmit = () => {
    axiosInstance
      .post("create-post/", {
        title: this.state.data.title,
        slug: "",
        author: this.props.users.filter(
          (user) => user.username == localStorage.getItem("currentUser")
        )[0].id,
        excerpt: this.state.data.excerpt,
        content: this.state.data.content,
      })
      .then((res) => {
        this.props.history.replace("/");
        console.log(res);
      })
      .catch((response) => console.log(response.response));
  };

  afterChange(input) {}

  render() {
    return (
      <DarkContext.Consumer>
        {(darkContext) => (
          <div
            className={
              "form-container border " +
              `${darkContext.darkMode ? "bg-dark" : "bg-light"}`
            }
          >
            <h1 className={darkContext.darkMode ? "text-light" : ""}>
              Create A Post
            </h1>
            <form action="" onSubmit={this.handleSubmit}>
              {this.renderInput("title", "Title")}
              {this.renderTextArea(
                "excerpt",
                "Excerpt",
                "Short description of the actual content."
              )}
              {this.renderTextArea("content", "Content")}
              {this.renderButton("Post")}
            </form>
          </div>
        )}
      </DarkContext.Consumer>
    );
  }
}
