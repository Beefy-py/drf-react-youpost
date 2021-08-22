import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserContext from "./../../context/userContext";
import ReactTooltip from "react-tooltip";
import axiosInstance from "./../../baseAxios";
import DarkContext from "./../../context/darkMode";

export default class SingularPost extends Component {
  state = { rating: 0, users: [] };
  static contextType = DarkContext;

  componentDidMount() {
    axiosInstance.get("user/list/").then((res) => {
      this.setState({ users: res.data });
    });

    axiosInstance.get("posts/" + this.props.post.slug).then((res) => {
      console.log(res.data.title + " has rating: " + res.data.rating);
      this.setState({ rating: res.data.rating });
    });
  }

  changeRating(post, value) {
    const { rating } = this.state;

    this.setState({ rating: rating + value });

    const restPost = {
      title: post.title,
      slug: post.slug,
      content: post.content,
      author: post.author,
      published: post.published,
    };

    console.log(restPost.published);

    axiosInstance
      .put("update-post/" + post.slug, {
        ...restPost,
        rating: rating + value,
      })
      .then((res) => console.log(res.data));
  }

  getRatingColor = (rate) => {
    const prefix = "rate badge ";

    if (rate > 999999999) return prefix + "rate1b";
    if (rate > 999999) return prefix + "rate1m";
    if (rate > 99999) return prefix + "rate100k";
    if (rate > 999) return prefix + "rate1k";
    if (rate > 0) return prefix + "before1k";
    if (rate === 0) return prefix + "rate0";
    if (rate < -999999999) return prefix + "rate-1b";
    if (rate < -999999) return prefix + "rate-1m";
    if (rate < -99999) return prefix + "rate-100k";
    if (rate < -999) return prefix + "rate-1k";
    if (rate < 0) return prefix + "before-1k";

    return prefix + "badge-primary";
  };
  render() {
    const {
      title,
      content,
      slug,
      author,
      image,
      postDate,
      day,
      dataType,
      post,

      getRatingSuffix,
    } = this.props;

    const rating = this.state.rating;
    const currentUser = this.state.users.filter(
      (user) => user.username == localStorage.getItem("currentUser")
    )[0];
    return (
      <div
        key={post.id}
        className={
          this.context.darkMode
            ? "blog-post text-light border bg-dark"
            : "blog-post border"
        }
      >
        <ReactTooltip />
        <div className="blog-post-img border">
          <img src={image} alt={"Image for: " + title} />
        </div>
        <div className="blog-post-info">
          <div className="blog-post-date">
            <span>{day}</span>
            <span>{postDate}</span>
          </div>
          <div className="blog-post-author">
            <UserContext.Consumer>
              {(userContext) => {
                return (
                  <React.Fragment>
                    by <span>{userContext.getAuthor(author)}</span>
                  </React.Fragment>
                );
              }}
            </UserContext.Consumer>
          </div>

          <h1 className="blog-post-title">{title}</h1>
          <p className="blog-post-text">
            {content.length >= 500
              ? content.substring(0, 500) + "..."
              : content}
          </p>
          <Link to={"posts/" + slug} className="blog-post-cta">
            Read More
          </Link>
        </div>
        <div className="blog-post-options">
          <div className={this.getRatingColor(rating)}>
            <span
              data-tip={
                "rating: " +
                rating.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              data-type={dataType}
            >
              {getRatingSuffix(rating)}
            </span>
          </div>
          {currentUser ? (
            <React.Fragment>
              {author === currentUser.id ? (
                <i className="fas fa-info-circle"></i>
              ) : (
                <React.Fragment>
                  <div className="react">
                    <div className="upvote">
                      <button
                        className="btn btn-success"
                        data-tip="like"
                        data-type={dataType}
                        onClick={() => this.changeRating(post, 1)}
                      >
                        <i className="fas fa-thumbs-up"></i>
                      </button>
                    </div>
                    <div className="downvote">
                      <button
                        className="btn btn-danger"
                        data-tip="dislike"
                        data-type={dataType}
                        onClick={() => this.changeRating(post, -1)}
                      >
                        <i className="fas fa-thumbs-down"></i>
                      </button>
                    </div>
                  </div>
                  <div className="other-react">
                    <div className="bookmark">
                      <button
                        className="btn btn-info"
                        data-tip="add to bookmarks"
                        data-type={dataType}
                      >
                        <i className="far fa-bookmark"></i>
                        {/* <i className="fas fa-bookmark"></i> */}
                      </button>
                    </div>
                    <div
                      className="comment"
                      data-tip="comment on this post"
                      data-type={dataType}
                    >
                      <button className="btn btn-dark">
                        <i
                          style={{ fontSize: ".8rem" }}
                          className="far fa-comment-alt"
                        ></i>
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
