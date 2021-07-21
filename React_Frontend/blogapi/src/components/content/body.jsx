import React from "react";
import axios from "axios";
import Posts from "./posts";
import PostLoadingComponent from "../actions/postLoading";
import { useState, useEffect, useContext } from "react";
import apiURL from "../../apiUrl";
import DarkContext from "./../../context/darkMode";
import { useHistory } from "react-router-dom";

const Body = ({ toggleShowSearchBar }) => {
  const darkContext = useContext(DarkContext);
  let history = useHistory();

  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({ loading: false, posts: null });

  useEffect(() => {
    toggleShowSearchBar(true);

    setAppState({ loading: true });
    axios
      .get(apiURL)
      .then((res) => setAppState({ loading: false, posts: res.data }));
  }, [setAppState]);

  return (
    <PostLoading rows={3} isLoading={appState.loading} posts={appState.posts} />
  );
};

export default Body;
