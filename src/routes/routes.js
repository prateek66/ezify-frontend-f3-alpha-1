import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Profile from "../pages/profile/profile";
import Home from "./../pages/home/home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
