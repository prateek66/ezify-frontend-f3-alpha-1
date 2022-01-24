import React, { useContext, useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";

import DashboardBarChart from "../dashboardBarChart";
import DashboardCard from "../dashboardCard";
import DashboardLineChart from "../dashboardLineChart";
import { selectToken, selectUserDetails } from "../../redux/user/user.selectors";

import "./dashboardContainer.scss";
import { connect } from "react-redux";
import moment from "moment";

import { ApiCallsContext } from "../../services/api.service";
import { catchHandler } from "../../utlis/catchHandler.utlis";
import { API_URLS } from "../../utlis/constants";

const DashboardContainer = ({ userDetails, token }) => {
  const ApiContext = useContext(ApiCallsContext);
  let days = [];

  const [lineChartConfigs, setLineChartConfigs] = useState({
    title: "Earnings",
    value: "INR 0",
    btnText: "Open Earnings",
    btnLink: "/dashboard/vendorEarnings",
    xaxis: {
      categories: days,
    },
    series: [],
  });

  const last7days = () => {
    for (let i = 6; i >= 0; i--) {
      const dateFrom = moment().subtract(i, "d").format("DD MMM, YYYY");
      days.push(dateFrom);
    }

    setLineChartConfigs({
      title: "Earnings",
      value: "INR 0",
      btnText: "Open Earnings",
      btnLink: "/dashboard/vendorEarnings",
      xaxis: {
        categories: days,
      },
      series: [],
    });
  };

  const generateLinechartSeries = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      let seriesData = [0, 0, 0, 0, 0, 0, 0];
      let totalValue = 0;
      data.forEach((series) => {
        console.log(series);
        totalValue += series.baseprice;
        const date = moment(series.createdAt).format("DD MMM, YYYY");
        const index = days.findIndex((val) => val === date);
        seriesData[index] += series.baseprice;
      });

      setLineChartConfigs({
        title: "Earnings",
        value: `INR ${totalValue}`,
        btnText: "Open Earnings",
        btnLink: "/dashboard/vendorEarnings",
        xaxis: {
          categories: days,
        },
        series: [
          {
            name: "earnings",
            data: seriesData,
          },
        ],
      });
    }
  };

  const fetchLineChartData = async () => {
    const response = await catchHandler(fetchLineChartDataAPI);
    generateLinechartSeries(response);
  };

  const fetchLineChartDataAPI = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (userDetails.roles === "vendor") {
      const data = await ApiContext.getData(API_URLS.VIEW_ALL_EARNINGS, { headers });
      return data;
    }
  };

  useEffect(() => {
    last7days();
    fetchLineChartData();
  }, []);

  return (
    <div className="dashboardContainer container">
      <h2 className="dashboardContainer__greetings">Hello {userDetails.firstName},</h2>

      <div className="d-flex align-items-center justify-content-start mt-4">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>

      <DashboardLineChart {...lineChartConfigs} />
      <DashboardBarChart />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  userDetails: selectUserDetails,
});

export default connect(mapStateToProps)(DashboardContainer);
