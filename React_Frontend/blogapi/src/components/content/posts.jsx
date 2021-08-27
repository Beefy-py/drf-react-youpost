import React, { Component } from "react";
import DarkContext from "./../../context/darkMode";
import ReactPaginate from "react-paginate";
import SingularPost from "./singularPost";
import ScrollToTopBtn from "../actions/scrollToTopBtn";

export default class App extends Component {
  state = { offset: 0, data: [], perPage: 6, currentPage: 0 };
  static contextType = DarkContext;

  componentDidMount() {
    if (this.props.posts) {
      this.receivedData();
    }
  }

  renderTags = (tagList) => {
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

  getRatingSuffix = (rating) => {
    if (rating > 999000000) {
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

    if (rating < -999999999) {
      const num = (rating / 1000000000).toFixed(1);
      return `${num}B`;
    }
    if (rating < -999999) {
      const num = (rating / 1000000).toFixed(1);
      return `${num}M`;
    }

    if (rating < -999) {
      const num = (rating / 1000).toFixed(1);
      return `${num}K`;
    }

    return rating.toString();
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

      console.log(image);

      const dataType = this.context.darkMode ? "light" : "dark";

      return (
        <React.Fragment key={post.id}>
          {" "}
          <SingularPost
            title={title}
            content={content}
            slug={slug}
            author={author}
            image={image}
            rating={rating}
            postDate={postDate}
            day={day}
            dataType={dataType}
            post={post}
            getRatingSuffix={this.getRatingSuffix}
            dataType={dataType}
          />
        </React.Fragment>
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
            <ScrollToTopBtn showOn={2500} />
          </React.Fragment>
        )}
      </DarkContext.Consumer>
    );
  }
}
