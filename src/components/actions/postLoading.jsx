import React, { useContext } from "react";
import Skeleton from "@yisheng90/react-loading";
import DarkContext from "./../../context/darkMode";
import Spinner from 'react-bootstrap/Spinner'

/*<Spinner animation="grow" variant="primary" />*/

const PostLoading = (Component) => {
  const darkContext = useContext(DarkContext);
  const renderLoadingBars = (numRows) => {
    return (
      <div
        style={{
          display: "block",
          width: "90%",
          margin: "0 auto 2rem",
        }}
        className={darkContext.darkMode ? "post-dark-loader" : ""}
      >
        <Skeleton height={300} rows={numRows} />
      </div>
    );
  };

  return function PostLoadingComponent({ rows, isLoading, ...props }) {
    if (!isLoading) {
      return <Component {...props} />;
    }

    if (props.textLoad){
      return <div> <p className={darkContext.darkMode? 'text-light':''}>{props.textLoad}</p> <Spinner animation="border" size="sm" variant='info'/></div>
    }

    return <React.Fragment>{renderLoadingBars(rows)}</React.Fragment>;
  };
};

export default PostLoading;
