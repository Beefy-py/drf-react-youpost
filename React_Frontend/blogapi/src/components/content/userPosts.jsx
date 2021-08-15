import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import history from "./../../history";
import DarkContext from "./../../context/darkMode";
import ReactPaginate from "react-paginate";

export default class UserPosts extends Component {
  state = { offset: 0, data: [], perPage: 12, currentPage: 0 };
  componentDidMount() {
    if (this.props.posts) {
      this.getUserPosts();
    }
  }

  getUserPosts() {
    const data = this.props.posts;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    const postData = slice.map((post) => {
      return (
        <DarkContext.Consumer key={post.id}>
          {(darkContext) => (
            <div
              key={post.id}
              className={
                darkContext.darkMode
                  ? "user-post dark-page-shadow bg-dark"
                  : "user-post border bg-light"
              }
            >
              <div className="title">
                <Link
                  to={"/posts/" + post.slug}
                  className={darkContext.darkMode ? "text-light" : "text-dark"}
                >
                  {post.title.length >= 20
                    ? post.title.substring(0, 20) + "..."
                    : post.title}
                </Link>
              </div>
              <div className="published">
                {new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "full",
                }).format(new Date(post.published))}
              </div>
              <div className="actions">
                <Link to={"/update-post/" + post.slug}>
                  <i className="fas fa-wrench"></i>
                </Link>
                <Link to={"/delete-post/" + post.slug}>
                  <i className="fas fa-trash-alt"></i>
                </Link>
              </div>
            </div>
          )}
        </DarkContext.Consumer>
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
      this.getUserPosts()
    );

    window.scrollTo(0, 0);
  };

  render() {
    const { posts } = this.props;

    return (
      <React.Fragment>
        {this.state.postData}{" "}
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
    );
  }
}
