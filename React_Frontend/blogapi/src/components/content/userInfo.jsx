import React, { Component } from "react";
import Form from "./../common/form";
import Joi from "./../../utils/extendedJoi";
import axiosInstance from "./../../baseAxios";

export default class UserInfo extends Form {
  componentDidMount() {
    this.setState({ pageBio: this.props.currentUser.bio });
    this.setState({ data: { bio: this.props.currentUser.bio } });
  }

  state = {
    data: { bio: "" },
    errors: {},

    pageBio: "",

    bioChangeActive: false,
  };

  schema = {
    bio: Joi.string().min(20).max(300).label("Bio"),
  };

  afterSubmit = () => {
    const { bio } = this.state.data;
    const { pageBio } = this.state;
    const { currentUser } = this.props;

    this.setState({ pageBio: bio });
    axiosInstance
      .put("user/list/" + currentUser.id, {
        ...currentUser,
        bio: bio,
      })
      .then((res) => console.log(res.data));

    this.setState({ bioChangeActive: false });
  };

  editBio = () => {
    this.setState({ bioChangeActive: !this.state.bioChangeActive });
  };

  afterChange(inp) {}

  render() {
    const { currentUser, darkCnxt } = this.props;
    const { bioChangeActive, pageBio } = this.state;

    return (
      <div
        className={
          darkCnxt.darkMode
            ? "user-info dark-page-shadow bg-dark text-light"
            : "user-info border bg-light"
        }
      >
        <h4>
          Your profile: <b>{localStorage.getItem("currentUser")}</b>{" "}
        </h4>
        <div className="more-info">
          <p>Joined on {currentUser.date_joined}</p>
          <p>{currentUser.email}</p>
        </div>
        <hr />
        <div className="bio">
          <p>{pageBio}</p>
          <button className="btn btn-outline-info" onClick={this.editBio}>
            {bioChangeActive ? "Close" : "Edit Bio"}
          </button>
          {bioChangeActive ? (
            <form action="" onSubmit={this.handleSubmit}>
              {this.renderTextArea("bio", "Bio")}
              {this.renderButton("submit")}
            </form>
          ) : (
            ""
          )}
        </div>
        {/* <img
                src="https://source.unsplash.com/random/1600x800"
                alt="random img"
              /> */}
      </div>
    );
  }
}
