import React from "react";

import { Switch, Route } from "react-router-dom";
import Login from "../pages/admin/login/login";

import Profile from "../pages/profile/profile";
import Services from "../pages/services/services";
import Home from "./../pages/home/home";
import Dashboard from "./../pages/dashboard/dashboard";
import Vendor from "./../pages/vendor/homePage";
import Bookings from "../pages/bookings";
import Payment from "../pages/payment";
import Orders from "../pages/orders";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/services/:name/:serviceId/:city?" component={Services} />
      <Route exact path="/admin" component={Login} />
      <Route exact path="/vendorhome" component={Vendor} />
      <Route path="/dashboard" component={Dashboard} />
      <Route exact path="/bookings" component={Bookings} />
      <Route exact path="/payment" component={Payment} />
      <Route exact path="/orders" component={Orders} />
    </Switch>
  );
};

export default Routes;
