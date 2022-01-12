import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Profile from "../pages/profile/profile";
import Services from "../pages/services/services";
import Home from "./../pages/home/home";
import Homepage from "./../pages/vendor/homePage";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/services" component={Services} />
        <Route exact path="/vendorhome" component={Homepage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
