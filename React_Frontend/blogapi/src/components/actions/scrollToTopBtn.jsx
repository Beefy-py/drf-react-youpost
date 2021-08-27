import React, { useState } from "react";

const ScrollToTopBtn = () => {
  const [showScrollBtn, setshowScrollBtn] = useState(false);

  window.onscroll = () => {
    console.log(document.documentElement.scrollTop);

    const showScollBtnOn = 2500;

    if (
      document.body.scrollTop > showScollBtnOn ||
      document.documentElement.scrollTop > showScollBtnOn
    ) {
      setshowScrollBtn(true);
    } else if (
      document.body.scrollTop < showScollBtnOn ||
      document.documentElement.scrollTop < showScollBtnOn
    ) {
      setshowScrollBtn(false);
    }
  };

  if (showScrollBtn) {
    return (
      <div className="scroll-to-top">
        <button
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
