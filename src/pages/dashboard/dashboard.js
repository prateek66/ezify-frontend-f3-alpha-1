import React from "react";

import DashboardHeader from "../../components/dashboardHeader/dashboardHeader";
import Sidebar from "../../components/sidebar/sidebar";
import DashboardRoutes from "../../routes/dashboard.routes";

import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="w-100">
        <DashboardHeader />
        <DashboardRoutes />
      </div>
    </div>
  );
};

export default Dashboard;
