import React from "react";

import "./dashboardCard.scss";

import earningsIconGreen from "./../../assets/dashboard/earningsIconGreen.webp";

const DashboardCard = () => {
  return (
    <div className="dashboardCard">
      <div className="row">
        <div className="col-3 d-flex align-items-center justify-content-center">
          <img src={earningsIconGreen} alt="Service" className="w-100" />
        </div>
        <div className="col-9">
          <div className="dashboardCard__title">Total Earnings</div>
          <div className="dashboardCard__value">68K</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
