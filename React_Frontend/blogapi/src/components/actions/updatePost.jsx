import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import DarkContext from "../../context/darkMode";
import axios from "axios";
import apiURL from "../../apiUrl";
import axiosInstance from "./../../baseAxios";
import { Link } from "react-router-dom";
import history from "./../../history";

export default class UpdatePost extends Form {
  componentDidMount() {
    this.props.toggleShowSearchBar(false);
    axiosInstance
      .get(apiURL + "posts/" + this.props.match.params.slug)
      .then((res) => {
        const { title, slug, excerpt, content } = res.data;
        this.setState({ slug: slug });
        this.setState({
          data: {
            title: title,
            excerpt: excerpt,
            content: content,
          },
        });
      });
  }

  state = {
    data: { title: "", excerpt: "", content: "" },
    errors: {},
    slug: "",
  };

  schema = {
    title: Joi.string().required().min(10).max(80).label("Title"),
    excerpt: Joi.string().required().min(50).label("Excerpt"),
    content: Joi.string().required().min(100).label("Content"),
  };

  afterSubmit = () => {
    axiosInstance
      .put("update-post/" + this.props.match.params.slug, {
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
              Updating Your Post..
            </h1>
            <form action="" onSubmit={this.handleSubmit}>
              {this.renderInput("title", "Title")}
              {this.renderTextArea(
                "excerpt",
                "Excerpt",
                "Short description of the actual content."
              )}
              {this.renderTextArea("content", "Content")}
              <div className="update-cancel-post-container">
                {this.renderButton("Update Post")}
                <Link
                  //to={"/posts/" + this.state.slug}
                  onClick={history.goBack}
                  className="btn btn-primary"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        )}
      </DarkContext.Consumer>
    );
  }
}
