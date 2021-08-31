import React, { Component } from "react";
import UserContext from "../../context/userContext";
import DarkContext from "./../../context/darkMode";
import { Link } from "react-router-dom";
import axiosInstance from "./../../baseAxios";
import CommentsHeader from "./../actions/commentsHeader";
import ScrollToTopBtn from "./../actions/scrollToTopBtn";


export default class PostDetail extends Component {
  state = {
    currentUserId: JSON.parse(
      atob(localStorage.getItem("access_token").split(".")[1])
    ).user_id,
    currentUser: {},
    comments:[],
    post:{},
  };

  componentDidMount() {

     axiosInstance
      .get("posts/" + this.props.match.params.slug)
      .then((res) => {
        this.setState({post: res.data});
        axiosInstance
          .get("comments/" +res.data.id)
          .then((resp) => {this.setState({comments:resp.data}); console.log(resp.data)})
      })
      .catch((response) => {
        console.log(response.response);
        if (response.response.status === 404) {
          window.location.replace("/*");
        }
      });

    axiosInstance
      .get("user/list/" + this.state.currentUserId)
      .then((res) => this.setState({ currentUser: res.data }));

  }

  renderUpDel = () => {
    const { currentUserId, currentUser, post } = this.state;
    const { slug } = this.state.post;

    if (currentUserId !== post.author) {
      if (currentUser.is_superuser) {
        console.log("admin has right to delete post.");
        return (
          <div className="actions">
            <Link to={"/update-post/" + slug}>
              <i className="fas fa-wrench"></i>
            </Link>
            <Link to={"/delete-post/" + slug}>
              <i className="fas fa-trash-alt"></i>
            </Link>
          </div>
        );
      }
      return "";
    }

    return (
      <div className="actions">
        <Link to={"/update-post/" + slug}>
          <i className="fas fa-wrench"></i>
        </Link>
        <Link to={"/delete-post/" + slug}>
          <i className="fas fa-trash-alt"></i>
        </Link>
      </div>
    );
  };

  addComment = (comment) => {
    const { comments, post } = this.state;
    let newComments = comments;
    newComments.unshift(comment);
    this.setState({ comments: newComments });

    axiosInstance
      .post("comments/", { ...comment, post: post.id })
      .catch((res) => console.log(res.response));
  };

  render() {
    const { title, image, author, content, published } = this.state.post;

    const { comments } = this.state;

    const accessToken = localStorage.getItem("access_token");

    return this.state.post ? (
      <DarkContext.Consumer>
        {(darkContext) => (
          <UserContext.Consumer>
            {(userContext) => (
              <article
                className={
                  darkContext.darkMode
                    ? "post-container text-light"
                    : "post-container"
                }
              >
                <ScrollToTopBtn showOn={700} />
                <div
                  className={
                    darkContext.darkMode
                      ? "dark-page-shadow post-img-title"
                      : "post-img-title"
                  }
                >
                  <div className="image-overlay">
                    <h1>{title}</h1>
                  </div>

                  <img
                    src={image}
                    className="card-img-top"
                    alt={"Image for: " + title}
                  />
                </div>
                <div
                  className={
                    darkContext.darkMode
                      ? "post-body dark-page-shadow border bg-dark"
                      : "post-body border bg-light"
                  }
                >
                  <span>
                    <p>
                      <b>{userContext.getAuthor(author)}</b>{" "}
                      <span> published on</span>
                    </p>
                    <p>
                      {published
                        ? new Intl.DateTimeFormat("en-GB", {
                            dateStyle: "full",
                          }).format(new Date(published))
                        : ""}
                    </p>
                  </span>
                  <hr />
                  <div
                    style={{ whiteSpace: "pre-wrap" }}
                    className={
                      darkContext.darkMode
                        ? "post-content"
                        : "post-content text-dark"
                    }
                  >
                    {content}
                  </div>

                  <React.Fragment>
                    {/* {author === currentUserId ? (
                      <div className="actions">
                        <Link to={"/update-post/" + slug}>
                          <i className="fas fa-wrench"></i>
                        </Link>
                        <Link to={"/delete-post/" + slug}>
                          <i className="fas fa-trash-alt"></i>
                        </Link>
                      </div>
                    ) : (
                      ""
                    )} */}
                    {this.renderUpDel()}
                  </React.Fragment>
                </div>
                <div
                  className={
                    darkContext.darkMode
                      ? "comments dark-page-shadow border bg-dark"
                      : "comments border bg-light"
                  }
                >
                  <CommentsHeader addComment={this.addComment} />
                  <section>
                    {comments.length ? (
                      comments.map((comment, comId) => (
                        <div
                          key={comId}
                          style={{ whiteSpace: "pre-wrap" }}
                          className="singular-comment dark-page-shadow"
                          style={{ boxShadow: "1px 3px 5px rgb(0 0 0 / 20%)" }}
                        >
                          <div className="comment-header">
                            {author === comment.author ? (
                              <p>
                                {userContext.getAuthor(comment.author)}{" "}
                                <i className="fas fa-user-check"></i>
                              </p>
                            ) : (
                              <p>{userContext.getAuthor(comment.author)}</p>
                            )}
                            <p>
                              {comment.posted
                                ? new Intl.DateTimeFormat("en-GB", {
                                    dateStyle: "long",
                                    timeStyle: "short",
                                  }).format(new Date(comment.posted))
                                : ""}
                            </p>
                          </div>
                          <hr />
                          <p>{comment.text}</p>
                        </div>
                      ))
                    ) : (
                      <h4>
                        No Comments <i className="fas fa-comment-dots"></i>
                      </h4>
                    )}
                  </section>
                </div>
              </article>
            )}
          </UserContext.Consumer>
        )}
      </DarkContext.Consumer>
    ) : (
      ""
    );
  }
}
