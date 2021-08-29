import React, { useState, useContext } from "react";
import ReactTooltip from "react-tooltip";
import DarkContext from "./../../context/darkMode";

const ScrollToTopBtn = (props) => {
  const [showScrollBtn, setshowScrollBtn] = useState(false);
  const darkContext = useContext(DarkContext);

  window.onscroll = () => {
    // console.log(document.documentElement.scrollTop);

    const { showOn } = props;

    if (
      document.body.scrollTop > showOn ||
      document.documentElement.scrollTop > showOn
    ) {
      setshowScrollBtn(true);
    } else if (
      document.body.scrollTop < showOn ||
      document.documentElement.scrollTop < showOn
    ) {
      setshowScrollBtn(false);
    }
  };

  const dataType = darkContext.darkMode ? "light" : "dark";

  if (showScrollBtn) {
    return (
      <div className="scroll-to-top">
        <ReactTooltip />
        <button
          data-tip="Scroll To Top"
          data-type={dataType}
          data-place="left"
          className="btn btn-success"
          onClick={() => window.scrollTo(0, 0)}
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>
    );
  }
  return "";
};

export default ScrollToTopBtn;
