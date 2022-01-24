import React from "react";
import Chart from "react-apexcharts";
import { withRouter } from "react-router-dom";

import CustomButton from "../atmoic/customButton/customButton";

import "./dashboardLineChart.scss";

const DashboardLineChart = ({ title, xaxis, value, btnLink, btnText, series, history }) => {
  const btnAttribute = {
    type: "button",
    text: btnText,
    classes: "customButton-ghost cp-4",
    onClick: () => history.push(btnLink),
  };

  const chart = {
    options: {
      chart: {
        id: "line-chart",
      },
      xaxis,
      markers: {
        size: 5,
      },
      colors: ["#09b162"],
    },
    series,
  };

  return (
    <div className="dashboardLineChart mt-4">
      <div className="row">
        <div className="col-4">
          <div className="dashboardLineChart__title">{title}</div>
          <div className="dashboardLineChart__value">{value}</div>
          <CustomButton {...btnAttribute} />
        </div>
        <div className="col-8">
          <Chart options={chart.options} series={chart.series} type="line" height="400" />
        </div>
      </div>
    </div>
  );
};

export default withRouter(DashboardLineChart);
