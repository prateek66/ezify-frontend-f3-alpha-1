import React, { Suspense } from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import Profile from "../pages/profile/profile";
import Login from "../pages/admin/login/login";
import Services from "../pages/services/services";
import Home from "./../pages/home/home";
import Dashboard from "./../pages/dashboard/dashboard";
import Vendor from "./../pages/vendor/homePage";
import Bookings from "../pages/bookings";
import Payment from "../pages/payment";
import Orders from "../pages/orders";
import { createStructuredSelector } from "reselect";
import { selectUserDetails } from "../redux/user/user.selectors";
import { connect } from "react-redux";
import NotAuthPage from "../pages/notAuthPage";
import NoMatchPage from "../pages/noMatchPage";

// const Profile = React.lazy(() => import("../pages/profile/profile"));

const Routes = ({ userDetails }) => {
  const renderComponent = (component, userType) => {
    if (userDetails && userDetails?.isActive && userType.includes(userDetails?.roles)) {
      return component;
    } else {
      return <Redirect to="/notAuthPage" />;
    }
  };

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" render={() => renderComponent(<Profile />, ["user", "vendor"])}></Route>
      <Route exact path="/services/:name/:serviceId/:city?" component={Services} />
      <Route exact path="/admin" component={Login} />
      <Route exact path="/vendorhome" component={Vendor} />
      <Route path="/dashboard" render={() => renderComponent(<Dashboard />, ["admin", "vendor"])} />
      <Route exact path="/bookings" render={() => renderComponent(<Bookings />, ["user"])} />
      <Route exact path="/payment" component={Payment} />
      <Route exact path="/orders" render={() => renderComponent(<Orders />, ["user"])} />
      <Route exact path="/notAuthPage" component={NotAuthPage} />
      <Route exact path="*" component={NoMatchPage} />
    </Switch>
  );
};

const mapStateToProps = createStructuredSelector({
  userDetails: selectUserDetails,
});

export default connect(mapStateToProps)(Routes);
