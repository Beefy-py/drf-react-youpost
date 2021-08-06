import React from "react";
import Posts from "./posts";
import PostLoadingComponent from "../actions/postLoading";
import { useState, useEffect, useContext } from "react";
import DarkContext from "./../../context/darkMode";
import { useHistory } from "react-router-dom";
import axiosInstance from "./../../baseAxios";
import ReactPaginate from "react-paginate";

const Body = ({ toggleShowSearchBar }) => {
  const darkContext = useContext(DarkContext);
  let history = useHistory();

  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({ loading: false, posts: null });

  useEffect(() => {
    toggleShowSearchBar(true);
    getPosts();
  }, [setAppState]);

  const getPosts = () => {
    setAppState({ loading: true });
    axiosInstance
      .get()
      .then((res) => setAppState({ loading: false, posts: res.data }));
  };

  let allPosts = [];
  axiosInstance.get().then((res) => (allPosts = res.data));

  const getPostsByTag = (tag) => {
    if (appState.posts) {
      if (tag === "Lat") {
        const filtered = allPosts.sort((p1, p2) => p2.id - p1.id);
        console.log(filtered);
        setAppState({ posts: filtered });
      }

      if (tag === "Old") {
        const filtered = allPosts.sort((p1, p2) => p1.id - p2.id);
        console.log(filtered);
        setAppState({ posts: filtered });
      }

      if (tag === "MPo") {
        const filtered = allPosts.sort((p1, p2) => p2.rating - p1.rating);
        setAppState({ posts: filtered });
      }

      if (tag === "LPo") {
        const filtered = allPosts.sort((p1, p2) => p1.rating - p2.rating);
        setAppState({ posts: filtered });
      }

      /*
      const filteredPosts = appState.posts.filter(
        (post) => post.category === tag
      );

      console.log(filteredPosts);

      setAppState({ posts: filteredPosts });


*/
      console.log("display posts by " + tag);
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
