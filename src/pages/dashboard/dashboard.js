import React from "react";
import DashboardContainer from "../../components/dashboardContainer/dashboardContainer";
import DashboardHeader from "../../components/dashboardHeader/dashboardHeader";
import Sidebar from "../../components/sidebar/sidebar";
import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="w-100">
        <DashboardHeader />
        <DashboardContainer />
      </div>
    </div>
  );
};

export default Dashboard;
