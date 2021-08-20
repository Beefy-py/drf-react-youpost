import React, { Component } from "react";
import { Link } from "react-router-dom";
import DarkContext from "./../../context/darkMode";
import ReactPaginate from "react-paginate";
import UserContext from "./../../context/userContext";
import ReactTooltip from "react-tooltip";
import axiosInstance from "./../../baseAxios";

export default class App extends Component {
  state = { offset: 0, data: [], perPage: 6, currentPage: 0 };

  static contextType = DarkContext;

  componentDidMount() {
    if (this.props.posts) {
      this.receivedData();
    }
  }

  renderTags = (tagList) => {
    /* <button
          onClick={getPostsByTag("latest")}
          className={
            darkContext.darkMode ? "badge badge-light" : "badge badge-dark"
          }
        >
          latest
        </button>
      */
    return tagList.map((tag) => (
      <button
        key={tag.id}
        onClick={() => this.props.getPostsByTag(tag.id)}
        className={"badge " + tag.styling}
      >
        {tag.name}
      </button>
    ));
  };

  reactToPost = (postId, vote) => {
    console.log("reacted to " + postId + " with " + vote);
  };

  getFormattedRating = (rating) => {
    if (rating > 999999999) {
      const num = (rating / 1000000000).toFixed(1);
      return `${num}B`;
    }
    if (rating > 999999) {
      const num = (rating / 1000000).toFixed(1);
      return `${num}M`;
    }
    if (rating > 999) {
      const num = (rating / 1000).toFixed(1);
      return `${num}K`;
    }

    return rating.toString();
  };

  likeDislike(post, action) {
    if (action === "like") {
      const postRate = parseInt(post.rating);
      console.log(postRate, post.slug);

      const restPost = {
        title: post.title,
        slug: post.slug,
        content: post.content,
        author: post.author,
      };

      console.log(restPost);
      axiosInstance
        .put("update-post/" + post.slug, { ...restPost, rating: postRate + 1 })
        .then((res) => console.log(res.data))
        .catch((res) => console.log(res.response));
    }
  }

  receivedData() {
    const data = this.props.posts;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    const postData = slice.map((post) => {
      const { title, content, slug, author, image, rating } = post;
      const postDate = new Intl.DateTimeFormat("en-GB", {
        month: "long",
        year: "numeric",
        day: "numeric",
      }).format(new Date(post.published));

      const day = new Date(postDate).toLocaleString("en-us", {
        weekday: "long",
      });

      console.log(image);

      const dataType = this.context.darkMode ? "light" : "dark";

      const toPass = {
        title: title,
        content: content,
        slug: slug,
        author: author,
        image: image,
        rating: rating,
        postDate: postDate,
        day: day,
        dataType: dataType,
        post: post,
      };

      return (
        <div
          className={
            this.context.darkMode
              ? "blog-post text-light border bg-dark"
              : "blog-post border"
          }
          key={post.id}
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
            <div className="react">
              <div className="rating badge badge-primary">
                <span
                  data-tip={
                    "rating: " +
                    rating.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  data-type={dataType}
                >
                  {rating ? this.getFormattedRating(rating) : 0}
                </span>
              </div>
              <div className="upvote">
                <button
                  className="btn btn-success"
                  data-tip="like"
                  data-type={dataType}
                  onClick={() => this.likeDislike(post, "like")}
                >
                  <i className="fas fa-thumbs-up"></i>
                </button>
              </div>
              <div className="downvote">
                <button
                  className="btn btn-danger"
                  data-tip="dislike"
                  data-type={dataType}
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
          </div>
        </div>
      );
    });

    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),

      postData,
    });
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({ currentPage: selectedPage, offset: offset }, () =>
      this.receivedData()
    );

    window.scrollTo(0, 0);
  };

  render() {
    const { posts } = this.props;
    const { renderTags, reactToPost } = this;

    const pageLinkClassName = this.context.darkMode
      ? " bg-dark page-link text-light"
      : "page-link";

    return (
      <DarkContext.Consumer>
        {(darkContext) => (
          <React.Fragment>
            <main
              className={
                darkContext.darkMode
                  ? "bg-dark dark-page-shadow "
                  : "bg-light border"
              }
            >
              <div className="post-tags">
                {renderTags([
                  { name: "latest", styling: "btn-primary", id: "Lat" },
                  { name: "most popular", styling: "btn-success", id: "MPo" },
                  { name: "least popular", styling: "btn-danger", id: "LPo" },
                  { name: "oldest", styling: "btn-warning", id: "Old" },
                ])}
              </div>

              <p
                className={
                  darkContext.darkMode ? "sorted-by text-light" : "sorted-by"
                }
              >
                Sorted By:{" "}
                <span>
                  <i className="fas fa-filter"></i> {this.props.curSorted}
                </span>
              </p>

              <section
                className={
                  darkContext.darkMode
                    ? "posts-section-dark posts-section"
                    : "posts-section"
                }
              >
                {this.state.postData}
              </section>
            </main>{" "}
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={3}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={pageLinkClassName}
              previousClassName={pageLinkClassName}
              nextClassName={pageLinkClassName}
              activeClassName={"active"}
            />
          </React.Fragment>
        )}
      </DarkContext.Consumer>
    );
  }
}
