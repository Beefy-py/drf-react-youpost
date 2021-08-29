import React from "react";
import axios from "axios";
import UserPosts from "./userPosts";
import PostLoadingComponent from "../actions/postLoading";
import { useState, useEffect, useContext } from "react";
import apiURL from "../../apiUrl";
import DarkContext from "./../../context/darkMode";
import { useHistory } from "react-router-dom";
import axiosInstance from "./../../baseAxios";

const UserPostsWrapper = ({ toggleShowSearchBar }) => {
  const darkContext = useContext(DarkContext);
  let history = useHistory();

  const PostLoading = PostLoadingComponent(UserPosts);
  const [appState, setAppState] = useState({ loading: false, posts: null });

  const currentUserId = JSON.parse(
    atob(localStorage.getItem("access_token").split(".")[1])
  ).user_id;

  useEffect(() => {
    toggleShowSearchBar(false);

    setAppState({ loading: true });
    axiosInstance.get().then((res) => {
      setAppState({
        loading: false,
        posts: res.data.filter((post) => post.author === currentUserId),
      });
    });
  }, [setAppState]);

  return (
    <PostLoading rows={1} isLoading={appState.loading} posts={appState.posts} />
  );
};

export default UserPostsWrapper;
