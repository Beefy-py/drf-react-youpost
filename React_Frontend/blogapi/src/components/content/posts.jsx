import React, { Component } from "react";
import { Link } from "react-router-dom";
import DarkContext from "./../../context/darkMode";
import ReactPaginate from "react-paginate";

export default class App extends Component {
  state = { offset: 0, data: [], perPage: 6, currentPage: 0 };

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
      // Would remove DRF/blog/migrations/0002_auto_20210815_1215.py
      // Would remove DRF/blog/migrations/0003_alter_post_image.py
      // Would remove DRF/blog/migrations/0004_alter_post_image.py
      // Would remove DRF/blog/migrations/0005_alter_post_image.py
      // Would remove DRF/blog/migrations/0006_alter_post_image.py
      // Would remove DRF/blog/migrations/__pycache__/0002_auto_20210815_1215.cpython-38.pyc
      // Would remove DRF/blog/migrations/__pycache__/0003_alter_post_image.cpython-38.pyc
      // Would remove DRF/blog/migrations/__pycache__/0004_alter_post_image.cpython-38.pyc
      // Would remove DRF/blog/migrations/__pycache__/0005_alter_post_image.cpython-38.pyc
      // Would remove DRF/blog/migrations/__pycache__/0006_alter_post_image.cpython-38.pyc
      // Would remove React_Frontend/blogapi/Pipfile
      // Would remove React_Frontend/blogapi/Pipfile.lock
      return (
        <div className="blog-post border" key={post.id}>
          <div className="blog-post-img border">
            <img src={image} alt={"Image for: " + post.title} />
          </div>
          <div className="blog-post-info">
            <div className="blog-post-date">
              <span>{day}</span>
              <span>{postDate}</span>
            </div>
            <div className="blog-post-author">
              <img src="" alt={"Image for " + { author }} />
              <span>{author}</span>
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
          <div className="blog-post-options">{rating ? rating : 0}</div>
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
                  { name: "least popular", styling: "btn-warning", id: "LPo" },
                  { name: "oldest", styling: "btn-secondary", id: "Old" },
                ])}
              </div>

              <p className="sorted-by">
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
              pageLinkClassName={"page-link"}
              previousClassName={"page-link"}
              nextClassName={"page-link"}
              activeClassName={"active"}
            />
          </React.Fragment>
        )}
      </DarkContext.Consumer>
    );
  }
}
