import React from "react";
import Chart from "react-apexcharts";
import { withRouter } from "react-router-dom";

import CustomButton from "../atmoic/customButton/customButton";

import "./dashboardBarChart.scss";

const DashboardBarChart = ({ title, value, btnText, btnLink, xaxis, series, history }) => {
  const btnAttribute = {
    type: "button",
    text: btnText,
    classes: "customButton-ghost cp-4",
    onClick: () => history.push(btnLink),
  };

  const chart = {
    options: {
      chart: {
        id: "column-chart",
      },
      xaxis,
      markers: {
        size: 5,
      },
      colors: ["#09b162"],
    },
    series
  };

  return (
    <div className="dashboardBarChart mt-4">
      <div className="row">
        <div className="col-4">
          <div className="dashboardBarChart__title">{title}</div>
          <div className="dashboardBarChart__value">{value}</div>
          <CustomButton {...btnAttribute} />
        </div>
        <div className="col-8">
          <Chart options={chart.options} series={chart.series} type="bar" height="400" />
        </div>
      </div>
    </div>
  );
};

export default withRouter(DashboardBarChart);
