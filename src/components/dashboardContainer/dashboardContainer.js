import React from "react";
import DashboardBarChart from "../dashboardBarChart";
import DashboardCard from "../dashboardCard";
import DashboardLineChart from "../dashboardLineChart";
import "./dashboardContainer.scss";

const DashboardContainer = () => {
  return (
    <div className="dashboardContainer container">
      <h2 className="dashboardContainer__greetings">Hello Prateek,</h2>

      <div className="d-flex align-items-center justify-content-start mt-4">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>

      <DashboardLineChart />
      <DashboardBarChart />
    </div>
  );
};

export default DashboardContainer;
