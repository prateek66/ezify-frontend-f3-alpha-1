import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminServices from "../components/adminServices/adminServices";
import DashboardContainer from "../components/dashboardContainer/dashboardContainer";

const DashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={DashboardContainer} />
      <Route exact path="/dashboard/services" component={AdminServices} />
    </Switch>
  );
};

export default DashboardRoutes;
