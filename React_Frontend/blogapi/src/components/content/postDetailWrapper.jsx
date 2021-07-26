import React, { useState, useEffect } from "react";
import PostDetail from "./postDetail";
import PostLoadingComponent from "./../actions/postLoading";
import axiosInstance from "axios";
import apiURL from "../../apiUrl";
import { useHistory } from "react-router-dom";

const PostDetailWrapper = ({ toggleShowSearchBar, match }) => {
  const history = useHistory();

  const [appState, setAppState] = useState({
    postIsLoading: false,
    post: {},
  });
  const PostLoading = PostLoadingComponent(PostDetail);

  useEffect(() => {
    toggleShowSearchBar(true);

    setAppState({ postIsLoading: true });
    axiosInstance
      .get(apiURL + "posts/" + match.params.slug)
      .then((res) => {
        console.log(res.data);
        setAppState({ postIsLoading: false, post: res.data });
      })
      .catch((response) => {
        console.log(response.response);
        if (response.response.status === 404) {
          history.push("/*");
        }
      });
  }, [setAppState]);

  return (
    <React.Fragment>
      <PostLoading
        rows={1}
        isLoading={appState.postIsLoading}
        post={appState.post}
      />
    </React.Fragment>
  );
};

export default PostDetailWrapper;
