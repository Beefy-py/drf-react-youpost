import React from "react";
import axios from "axios";
import Posts from "./posts";
import PostLoadingComponent from "../actions/postLoading";
import { useState, useEffect, useContext } from "react";
import apiURL from "../../apiUrl";
import DarkContext from "./../../context/darkMode";
import { useHistory } from "react-router-dom";
import axiosInstance from "./../../baseAxios";

const Body = ({ toggleShowSearchBar }) => {
  const darkContext = useContext(DarkContext);
  let history = useHistory();

  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({ loading: false, posts: null });

  useEffect(() => {
    toggleShowSearchBar(true);

    setAppState({ loading: true });
    axiosInstance
      .get()
      .then((res) => setAppState({ loading: false, posts: res.data }));
  }, [setAppState]);

  let allPosts = [];
  axiosInstance.get().then((res) => (allPosts = res.data));

  const getPostsByTag = (tag) => {
    if (appState.posts) {
      if (tag === "Lat") {
        setAppState({ posts: allPosts });
        return "";
      }

      if (tag === "Old") {
        setAppState({ posts: allPosts.reverse() });
        return "";
      }

      const filteredPosts = appState.posts.filter(
        (post) => post.category === tag
      );

      console.log(filteredPosts);

      setAppState({ posts: filteredPosts });

      return "display posts by " + tag;
    }
  };

  return (
    <PostLoading
      rows={3}
      getPostsByTag={getPostsByTag}
      isLoading={appState.loading}
      posts={appState.posts}
    />
  );
};

export default Body;
