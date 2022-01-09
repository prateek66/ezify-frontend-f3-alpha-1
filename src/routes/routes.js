import React from "react";

import { Switch, Route } from "react-router-dom";
import Login from "../pages/admin/login/login";
import Dashboard from "../pages/dashboard/dashboard";

import Profile from "../pages/profile/profile";
import Services from "../pages/services/services";
import Home from "./../pages/home/home";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/services" component={Services} />
      <Route exact path="/admin" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default Routes;
