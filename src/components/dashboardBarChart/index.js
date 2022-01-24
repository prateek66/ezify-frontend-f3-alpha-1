import React from "react";
import Chart from "react-apexcharts";

import CustomButton from "../atmoic/customButton/customButton";

import "./dashboardBarChart.scss";

const DashboardBarChart = () => {
  const btnAttribute = {
    type: "button",
    text: "Open Bookings",
    classes: "customButton-ghost cp-4",
  };

  const chart = {
    options: {
      chart: {
        id: "column-chart",
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
    <div className="dashboardBarChart mt-4">
      <div className="row">
        <div className="col-4">
          <div className="dashboardBarChart__title">Bookings</div>
          <div className="dashboardBarChart__value">128</div>
          <CustomButton {...btnAttribute} />
        </div>
        <div className="col-8">
          <Chart options={chart.options} series={chart.series} type="bar" height="400" />
        </div>
      </div>
    </div>
  );
};

export default DashboardBarChart;
