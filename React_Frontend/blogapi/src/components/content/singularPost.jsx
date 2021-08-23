import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserContext from "./../../context/userContext";
import ReactTooltip from "react-tooltip";
import axiosInstance from "./../../baseAxios";
import DarkContext from "./../../context/darkMode";

export default class SingularPost extends Component {
  state = {
    rating: 0,
    users: [],
    currentUserId: JSON.parse(
      atob(localStorage.getItem("access_token").split(".")[1])
    ).user_id,
    currentUser: {},
    likeClass: "btn btn-outline-dark",
    dislikeClass: "btn btn-outline-dark",
    bookmarkClass: "btn btn-outline-dark",
    bookmarkDataTip: "add to bookmarks",
  };

  static contextType = DarkContext;

  componentDidMount() {
    axiosInstance.get("user/list/").then((res) => {
      this.setState({ users: res.data });
    });

    axiosInstance
      .get("posts/" + this.props.post.slug)
      .then((res) => this.setState({ rating: res.data.rating }));

    axiosInstance.get("user/list/" + this.state.currentUserId).then((res) => {
      this.setState({ currentUser: res.data });

      const { post } = this.props;

      if (res.data.liked.includes(post.id)) {
        this.setState({ likeClass: "btn btn-success disabled" });
        this.setState({ dislikeClass: "btn btn-outline-dark disabled" });
      }

      if (res.data.disliked.includes(post.id)) {
        // console.log(`${res.data.username} has already disliked  ${post.title}`);
        this.setState({ dislikeClass: "btn btn-danger disabled" });
        this.setState({ likeClass: "btn btn-outline-dark disabled" });
      }

      if (res.data.bookmarked.includes(post.id)) {
        this.setState({ bookmarkClass: "btn btn-info" });
        this.setState({ bookmarkDataTip: "remove from bookmarks" });
      }
    });
  }

  changeRating(post, value) {
    const { rating, currentUser, currentUserId } = this.state;

    const restPost = {
      title: post.title,
      slug: post.slug,
      content: post.content,
      author: post.author,
      published: post.published,
    };

    let likedPosts = currentUser.liked;
    let dislikedPosts = currentUser.disliked;

    if (value === 1) {
      likedPosts.push(post.id);
      console.log(
        currentUser.username + " liked " + post.title + " with id " + post.id
      );
    } else {
      dislikedPosts.push(post.id);
      console.log(
        currentUser.username + " disliked " + post.title + " with id " + post.id
      );
    }

    currentUser.liked = likedPosts;
    currentUser.dislike = dislikedPosts;

    if (currentUser.liked.includes(post.id)) {
      this.setState({ likeClass: "btn btn-success disabled" });
      this.setState({ dislikeClass: "btn btn-outline-dark disabled" });
    }

    if (currentUser.disliked.includes(post.id)) {
      this.setState({ dislikeClass: "btn btn-danger disabled" });
      this.setState({ likeClass: "btn btn-outline-dark disabled" });
    }

    axiosInstance.put("user/list/" + currentUserId, currentUser);

    this.setState({ rating: rating + value });

    axiosInstance.put("update-post/" + post.slug, {
      ...restPost,
      rating: rating + value,
    });
  }

  addBookmark = (post) => {
    const { currentUser, currentUserId } = this.state;
    let bookmarked;
    bookmarked = currentUser.bookmarked;
    console.log("\n before", currentUser.bookmarked);

    if (currentUser.bookmarked.includes(post.id)) {
      bookmarked.splice(bookmarked.indexOf(post.id), 1);
      this.setState({ bookmarkClass: "btn btn-outline-dark" });
      this.setState({ bookmarkDataTip: "add to bookmarks" });
    } else {
      bookmarked.push(post.id);
      this.setState({ bookmarkClass: "btn btn-info" });
      this.setState({ bookmarkDataTip: "remove from bookmarks" });
    }

    currentUser.bookmarked = bookmarked;
    console.log("\n after", currentUser.bookmarked);

    axiosInstance.put("user/list/" + currentUserId, {
      ...currentUser,
      bookmarked: bookmarked,
    });

    window.location.replace("/dashboard");
  };

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

    const { likeClass, dislikeClass, bookmarkClass, bookmarkDataTip } =
      this.state;

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
                  <ReactTooltip />
                  <div className="react">
                    <div className="upvote">
                      <button
                        className={likeClass}
                        data-tip="like"
                        data-type={dataType}
                        onClick={() => this.changeRating(post, 1)}
                      >
                        <i className="far fa-thumbs-up"></i>
                      </button>
                    </div>
                    <div className="downvote">
                      <button
                        className={dislikeClass}
                        data-tip="dislike"
                        data-type={dataType}
                        onClick={() => this.changeRating(post, -1)}
                      >
                        <i className="far fa-thumbs-down"></i>
                      </button>
                    </div>
                  </div>
                  <div className="other-react">
                    <div className="bookmark">
                      <button
                        className={bookmarkClass}
                        data-tip={bookmarkDataTip}
                        data-type={dataType}
                        onClick={() => this.addBookmark(post)}
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
