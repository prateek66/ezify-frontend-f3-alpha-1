import React from "react";

import "./../notAuthPage/notAuthPage.scss";

const NoMatchPage = () => {
  return (
    <div id="sign-wrapper">
      <div id="hole1" class="hole"></div>
      <div id="hole2" class="hole"></div>
      <div id="hole3" class="hole"></div>
      <div id="hole4" class="hole"></div>
      <header id="header">
        <h1 className="h1">404 <br /> Not Found</h1>
      </header>
    </div>
  );
};

export default NoMatchPage;
