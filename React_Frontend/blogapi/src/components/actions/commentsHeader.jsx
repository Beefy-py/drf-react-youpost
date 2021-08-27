import React from "react";
import Form from "./../common/form";
import Joi from "./../../utils/extendedJoi";

export default class CommentsHeader extends Form {
  state = {
    showCommentForm: false,
    data: { comment: "" },
    errors: {},
    currentUserId: JSON.parse(
      atob(localStorage.getItem("access_token").split(".")[1])
    ).user_id,
  };

  schema = {
    comment: Joi.string().max(1500).label("Comment"),
  };

  toggleForm = () => {
    this.setState({ showCommentForm: !this.state.showCommentForm });
  };

  afterSubmit = () => {
    this.setState({ showCommentForm: false });

    const { addComment } = this.props;
    const { comment } = this.state.data;
    const { currentUserId } = this.state;

    addComment({ author: currentUserId, text: comment });

    this.setState({ data: { comment: "" } });
  };

  afterChange(input) {}

  render() {
    const { showCommentForm } = this.state;
    return (
      <React.Fragment>
        <div className="comments-header">
          <p>Comments Section</p>
          <p>
            <button
              onClick={this.toggleForm}
              className="btn btn-outline-primary"
            >
              {showCommentForm ? (
                "close"
              ) : (
                <React.Fragment>
                  {" "}
                  <i className="fas fa-plus"></i> comment
                </React.Fragment>
              )}
            </button>
          </p>
        </div>
        {this.state.showCommentForm ? (
          <div className="comment-form">
            <form action="" onSubmit={this.handleSubmit}>
              {this.renderTextArea("comment", "Comment")}
              {this.renderButton("Submit")}
            </form>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
