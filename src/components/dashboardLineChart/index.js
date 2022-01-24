import React from "react";
import Chart from "react-apexcharts";

import CustomButton from "../atmoic/customButton/customButton";

import "./dashboardLineChart.scss";

const DashboardLineChart = () => {
  const btnAttribute = {
    type: "button",
    text: "Open Earnings",
    classes: "customButton-ghost cp-4",
  };

  const chart = {
    options: {
      chart: {
        id: "line-chart",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
      markers: {
        size: 5,
      },
      colors: ["#09b162"],
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  return (
    <div className="dashboardLineChart mt-4">
      <div className="row">
        <div className="col-4">
          <div className="dashboardLineChart__title">Earnings</div>
          <div className="dashboardLineChart__value">INR 68,631</div>
          <CustomButton {...btnAttribute} />
        </div>
        <div className="col-8">
          <Chart options={chart.options} series={chart.series} type="line" height="400" />
        </div>
      </div>
    </div>
  );
};

export default DashboardLineChart;
