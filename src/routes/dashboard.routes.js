import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import AdminServices from "../components/adminServices/adminServices";
import AdminVendors from "../components/adminVendors";
import DashboardContainer from "../components/dashboardContainer/dashboardContainer";
import VendorBookings from "../components/vendorBookings";
import VendorEarnings from "../components/vendorEarnings";
import { selectUserDetails } from "../redux/user/user.selectors";

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
      <Route exact path="/dashboard" component={DashboardContainer} />
      <Route exact path="/dashboard/services" render={() => renderComponent(<AdminServices />, ["admin"])} />
      <Route exact path="/dashboard/vendors" render={() => renderComponent(<AdminVendors />, ["admin"])} />
      <Route exact path="/dashboard/vendorBookings" render={() => renderComponent(<VendorBookings />, ["vendor"])} />
      <Route exact path="/dashboard/vendorEarnings" render={() => renderComponent(<VendorEarnings />, ["vendor"])} />
    </Switch>
  );
};

const mapStateToProps = createStructuredSelector({
  userDetails: selectUserDetails,
});

export default connect(mapStateToProps)(DashboardRoutes);
