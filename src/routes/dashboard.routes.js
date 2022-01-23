import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminServices from "../components/adminServices/adminServices";
import AdminVendors from "../components/adminVendors";
import DashboardContainer from "../components/dashboardContainer/dashboardContainer";
import vendorBookings from "../components/vendorBookings";
import VendorEarnings from "../components/vendorEarnings";

const DashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={DashboardContainer} />
      <Route exact path="/dashboard/services" component={AdminServices} />
      <Route exact path="/dashboard/vendors" component={AdminVendors} />
      <Route exact path="/dashboard/vendorBookings" component={vendorBookings} />
      <Route exact path="/dashboard/vendorEarnings" component={VendorEarnings} />
    </Switch>
  );
};

export default DashboardRoutes;
