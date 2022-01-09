import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardContainer from "../components/dashboardContainer/dashboardContainer";
import Services from "../pages/services/services";

const DashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={DashboardContainer} />
      <Route exact path="/dashboard/services" component={Services} />
    </Switch>
  );
};

export default DashboardRoutes;
