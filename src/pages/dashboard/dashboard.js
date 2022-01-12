import React from "react";

import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/sidebar";
import DashboardRoutes from "../../routes/dashboard.routes";

import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="w-100">
        <Header showVendorBtn={false} />
        <DashboardRoutes />
      </div>
    </div>
  );
};

export default Dashboard;
