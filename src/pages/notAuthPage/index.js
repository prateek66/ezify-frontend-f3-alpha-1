import React from "react";

import "./notAuthPage.scss";

import Portrait_Placeholder from "./../../assets/notAuthPage/Portrait_Placeholder.png";

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
            {/* <p>
              <strong>Error 403: Forbidden</strong>. You do not have permission to view this page.
            </p> */}
          </div>
          {/* <div id="circle-container">
            <svg version="1.1" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
              <defs>
                <pattern id="image" patternUnits="userSpaceOnUse" height="450" width="450">
                  <image x="25" y="25" height="450" width="450" src={Portrait_Placeholder}></image>
                </pattern>
              </defs>
              <circle cx="250" cy="250" r="200" stroke-width="40px" stroke="#ef5350" fill="url(#image)" />
              <line x1="100" y1="100" x2="400" y2="400" stroke-width="40px" stroke="#ef5350" />
            </svg>
          </div> */}
        </section>
      </div>
    </>
  );
};

export default NotAuthPage;
