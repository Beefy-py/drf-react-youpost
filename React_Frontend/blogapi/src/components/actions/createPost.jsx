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
    axiosInstance.get().then((res) => {
      const slugs = res.data.map((post) => post.slug);
      this.setState({ slugs: slugs });
    });
  }

  state = {
    data: { title: "", content: "" },
    errors: {},
    slugs: [],
  };

  schema = {
    title: Joi.string().required().min(10).max(80).label("Title"),
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
        content: this.state.data.content,
      })
      .then((res) => {
        this.props.history.replace("/dashboard");
        console.log(res);
      })
      .catch((response) => console.log(response.response));
  };

  afterChange(inp) {}

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
              {this.renderTextArea("content", "Content")}
              {this.renderButton("Post")}
            </form>
          </div>
        )}
      </DarkContext.Consumer>
    );
  }
}
