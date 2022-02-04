import React, { useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import Home from "./../pages/home/home";
import { createStructuredSelector } from "reselect";
import { selectUserDetails } from "../redux/user/user.selectors";
import { connect } from "react-redux";

import loadable from "@loadable/component";

import Dashboard from "./../pages/dashboard/dashboard.js";

import CustomSpinner from "./../components/atmoic/spinner";

const LoadableProfile = loadable(() => import("../pages/profile/profile.js"), {
  fallback: <CustomSpinner />,
});

const LoadableServices = loadable(() => import("../pages/services/services"), {
  fallback: <CustomSpinner />,
});

const LoadableLogin = loadable(() => import("../pages/admin/login/login"), {
  fallback: <CustomSpinner />,
});

const LoadableVendor = loadable(() => import("./../pages/vendor/homePage"), {
  fallback: <CustomSpinner />,
});

const LoadableDashboard = loadable(() => import("./../pages/dashboard/dashboard.js"), {
  fallback: <CustomSpinner />,
});

const LoadableBookings = loadable(() => import("../pages/bookings"), {
  fallback: <CustomSpinner />,
});

const LoadablePayment = loadable(() => import("../pages/payment"), {
  fallback: <CustomSpinner />,
});

const LoadableOrders = loadable(() => import("../pages/orders"), {
  fallback: <CustomSpinner />,
});

const LoadableNotAuthPage = loadable(() => import("../pages/notAuthPage"), {
  fallback: <CustomSpinner />,
});

const LoadableNoMatchPage = loadable(() => import("../pages/noMatchPage"), {
  fallback: <CustomSpinner />,
});

const Routes = ({ userDetails }) => {
  let location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const renderComponent = (component, userType) => {
    if (userDetails && userDetails?.isActive && userType.includes(userDetails?.roles)) {
      return component;
    } else {
      return <Redirect to="/notAuthPage" />;
    }
  };

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" render={() => renderComponent(<LoadableProfile />, ["user", "vendor"])}></Route>
          <Route exact path="/services/:name/:serviceId/:city?" component={LoadableServices} />
          <Route exact path="/admin" component={LoadableLogin} />
          <Route exact path="/vendorhome" component={LoadableVendor} />
          {/* <Route path="/dashboard" render={() => renderComponent(<Dashboard />, ["admin", "vendor"])} /> */}
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/bookings" render={() => renderComponent(<LoadableBookings />, ["user"])} />
          <Route exact path="/payment" component={LoadablePayment} />
          <Route exact path="/orders" render={() => renderComponent(<LoadableOrders />, ["user"])} />
          <Route exact path="/notAuthPage" component={LoadableNotAuthPage} />
          <Route exact path="*" component={LoadableNoMatchPage} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

const mapStateToProps = createStructuredSelector({
  userDetails: selectUserDetails,
});

export default connect(mapStateToProps)(Routes);
