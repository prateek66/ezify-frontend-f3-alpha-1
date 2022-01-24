import React from "react";
import DashboardCard from "../dashboardCard";
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
    </div>
  );
};

export default DashboardContainer;
