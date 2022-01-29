import React from "react";

import "./notAuthPage.scss";

const NotAuthPage = () => {
  return (
    <>
      <div id="sign-wrapper">
        <div id="hole1" class="hole"></div>
        <div id="hole2" class="hole"></div>
        <div id="hole3" class="hole"></div>
        <div id="hole4" class="hole"></div>
        <header id="header">
          <h1 className="h1">403 forbidden</h1>
          <div id="strike1" class="strike"></div>
          <div id="strike2" class="strike"></div>
        </header>
        <section id="sign-body">
          <div>
            <h2 className="h2">Authorized Personnel Only</h2>
          </div>
        </section>
      </div>
    </>
  );
};

export default NotAuthPage;
