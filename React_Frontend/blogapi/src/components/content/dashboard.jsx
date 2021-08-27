import React, { Component } from "react";
import { Link } from "react-router-dom";
import DarkContext from "../../context/darkMode";
import UserPostsWrapper from "./userPostsWrapper";
import axiosInstance from "./../../baseAxios";
import UserInfo from "./userInfo";

export default class Dashboard extends Component {
  state = {
    currentUserId: JSON.parse(
      atob(localStorage.getItem("access_token").split(".")[1])
    ).user_id,
    currentUser: {},
    posts: null,
    dataClasses: { data1: "data", data2: "data", data3: "data" },
  };

  componentDidMount() {
    axiosInstance
      .get("user/list/" + this.state.currentUserId)
      .then((res) => this.setState({ currentUser: res.data }));
    axiosInstance.get().then((res) => this.setState({ posts: res.data }));
  }

  renderPostById = (id) => {
    if (this.state.posts) {
      const post = this.state.posts.filter((post) => post.id === id)[0];
      return post.title;
    }
  };

  getPostSlug = (id) => {
    if (!this.state.posts) return "";
    const url =
      "posts/" + this.state.posts.filter((post) => post.id === id)[0].slug;
    if (url) return url;
    return "";
  };

  toggleAccordion = (cl) => {
    const { dataClasses } = this.state;
    let newClasses = dataClasses;

    if (newClasses[cl] === cl) {
      newClasses[cl] = "data";
    } else {
      newClasses = { data1: "data", data2: "data", data3: "data" };
      newClasses[cl] = cl;
    }

    this.setState({ dataClasses: newClasses });
  };

  renderChevron = (dcl) => {
    const { dataClasses } = this.state;
    if (dataClasses[dcl] === dcl) {
      console.log(dcl);
      return <i className="fas fa-chevron-up"></i>;
    }

    return <i className="fas fa-chevron-down"></i>;
  };

  render() {
    const { currentUser, posts, dataClasses } = this.state;

    let currentUserPosts;
    let topPost = {};
    if (posts) {
      currentUserPosts = posts.filter(
        (post) => post.author === this.state.currentUserId
      );

      topPost = currentUserPosts.sort((p1, p2) => p1.rating - p2.rating)[0];
    }

    console.log(topPost);

    return (
      <DarkContext.Consumer>
        {(darkContext) => (
          <div className="dashboard">
            {currentUser["id"] && (
              <UserInfo
                darkCnxt={darkContext}
                currentUser={currentUser}
                topPost={topPost}
              />
            )}
            <div
              className={
                darkContext.darkMode
                  ? "posts-reacted dark-page-shadow bg-dark text-light"
                  : "posts-reacted border bg-light"
              }
            >
              <div className="accordion">
                <button
                  className="btn btn-dark"
                  onClick={() => this.toggleAccordion("data1")}
                >
                  <span>posts liked</span>
                  {this.renderChevron("data1")}
                </button>
                <div className={dataClasses.data1}>
                  {currentUser.liked ? (
                    <React.Fragment>
                      {currentUser.liked.map((i) => (
                        <p>
                          <i className="fas fa-thumbs-up"></i> <span>|</span>
                          <Link to={this.getPostSlug(i)}>
                            {" "}
                            {this.renderPostById(i)}
                          </Link>
                        </p>
                      ))}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="accordion">
                <button
                  className="btn btn-dark"
                  onClick={() => this.toggleAccordion("data2")}
                >
                  <span>posts disliked</span>
                  {this.renderChevron("data2")}
                </button>
                <div className={dataClasses.data2}>
                  {currentUser.disliked ? (
                    <React.Fragment>
                      {currentUser.disliked.map((i) => (
                        <p>
                          <i className="fas fa-thumbs-down"></i> <span>|</span>
                          <Link to={this.getPostSlug(i)}>
                            {" "}
                            {this.renderPostById(i)}
                          </Link>
                        </p>
                      ))}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="accordion">
                <button
                  className="btn btn-dark"
                  onClick={() => this.toggleAccordion("data3")}
                >
                  <span>posts bookmarked</span>
                  {this.renderChevron("data3")}
                </button>
                <div className={dataClasses.data3}>
                  {currentUser.bookmarked ? (
                    <React.Fragment>
                      {currentUser.bookmarked.map((i) => (
                        <p>
                          <i className="fas fa-bookmark"></i> <span>|</span>
                          <Link to={this.getPostSlug(i)}>
                            {" "}
                            {this.renderPostById(i)}
                          </Link>
                        </p>
                      ))}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div className="user-posts">
              <div className="manage-user-posts">
                <Link to="/create-post">
                  Post <i className="fas fa-plus-square"></i> <span>|</span>
                </Link>
              </div>
              <UserPostsWrapper
                toggleShowSearchBar={this.props.toggleShowSearchBar}
                userPosts={currentUserPosts}
              ></UserPostsWrapper>
            </div>
          </div>
        )}
      </DarkContext.Consumer>
    );
  }
}
