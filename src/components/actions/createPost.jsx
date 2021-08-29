import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
// import Joi from "./../../utils/extendedJoi";
import DarkContext from "../../context/darkMode";
import axiosInstance from "./../../baseAxios";

export default class CreatePost extends Form {
  componentDidMount() {
    this.props.toggleShowSearchBar(false);
    axiosInstance.get().then((res) => {
      const slugs = res.data.map((post) => post.slug);
      this.setState({ slugs: slugs });
    });

    const BaseJoi = require("joi-browser");
    const ImageExtension = require("joi-image-extension");

    const Joi = BaseJoi.extend(ImageExtension);
    this.setState({ joi: Joi });
  }

  state = {
    data: { title: "", image: "", content: "" },
    errors: {},
    slugs: [],
    joi: "",
  };

  schema = {
    title: Joi.string().required().min(10).max(80).label("Title"),
    image: this.state.joi
      ? this.state.joi.image().label("Image")
      : Joi.string().label("Image"),
    // image: Joi.image().label("Image"),
    content: Joi.string().required().min(100).label("Content"),
  };

  afterSubmit = () => {
    const { title, content } = this.state.data;

    let formData = new FormData();

    formData.append("image", this.chosenImg, this.chosenImg.name);
    formData.append("title", title);
    formData.append("content", content);
    formData.append(
      "author",
      this.props.users.filter(
        (user) => user.username == localStorage.getItem("currentUser")
      )[0].id
    );

    axiosInstance
      .post("create-post/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.props.history.replace("/dashboard");
        console.log(res);
      })
      .catch((res) => {
        const errorTitle = res.response.data.title
          ? res.response.data.title[0]
          : "";

        const errors400 = { ...this.state.errors, title: errorTitle };
        this.setState({ errors: errors400 });
      });
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
              {this.renderImageField("image", "Image", "image/*")}
              {this.renderTextArea("content", "Content")}
              {this.renderButton("Post")}
            </form>
          </div>
        )}
      </DarkContext.Consumer>
    );
  }
}
