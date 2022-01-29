import React from "react";

import "./dashboardCard.scss";

import earningsIconGreen from "./../../assets/dashboard/earningsIconGreen.svg";

const DashboardCard = () => {
  return (
    <div className="dashboardCard">
      <div className="row">
        <div className="col-3">
          <img src={earningsIconGreen} alt="Service" className="h-100 w-100" />
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
