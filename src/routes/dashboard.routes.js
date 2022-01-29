import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { selectUserDetails } from "../redux/user/user.selectors";

import loadable from "@loadable/component";

import CustomSpinner from "./../components/atmoic/spinner";
import Sidebar from "../components/sidebar/sidebar";
import Header from "../components/header/Header";

const LoadableDashboardContainer = loadable(() => import("../components/dashboardContainer/dashboardContainer"), {
  fallback: <CustomSpinner />,
});

const LoadableAdminServices = loadable(() => import("../components/adminServices/adminServices"), {
  fallback: <CustomSpinner />,
});

const LoadableAdminVendors = loadable(() => import("../components/adminVendors"), {
  fallback: <CustomSpinner />,
});

const LoadableVendorBookings = loadable(() => import("../components/vendorBookings"), {
  fallback: <CustomSpinner />,
});

const LoadableVendorEarnings = loadable(() => import("../components/vendorEarnings"), {
  fallback: <CustomSpinner />,
});

const DashboardRoutes = ({ userDetails }) => {
  const renderComponent = (component, userType) => {
    if (userDetails && userDetails?.isActive && userType.includes(userDetails?.roles)) {
      return component;
    } else {
      return <Redirect to="/notAuthPage" />;
    }
  };

  return (
    <Switch>
      <Route exact path="/dashboard" render={() => renderComponent(<LoadableDashboardContainer />, ["admin", "vendor"])} />
      <Route exact path="/dashboard/services" render={() => renderComponent(<LoadableAdminServices />, ["admin"])} />
      <Route exact path="/dashboard/vendors" render={() => renderComponent(<LoadableAdminVendors />, ["admin"])} />
      <Route exact path="/dashboard/vendorBookings" render={() => renderComponent(<LoadableVendorBookings />, ["vendor"])} />
      <Route exact path="/dashboard/vendorEarnings" render={() => renderComponent(<LoadableVendorEarnings />, ["vendor"])} />
    </Switch>
  );
};

const mapStateToProps = createStructuredSelector({
  userDetails: selectUserDetails,
});

export default connect(mapStateToProps)(DashboardRoutes);
