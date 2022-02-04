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
  const role = userDetails.roles;
  const ApiContext = useContext(ApiCallsContext);
  let days = [];

  const [lineChartConfigs, setLineChartConfigs] = useState({
    title: role === "vendor" ? "Earnings" : "Vendors",
    value: role === "vendor" ? "INR 0" : "0",
    btnText: role === "vendor" ? "Open Earnings" : "Open Vendors",
    btnLink: role === "vendor" ? "/dashboard/vendorEarnings" : "/dashboard/vendors",
    xaxis: {
      categories: days,
    },
    series: [],
  });

  const [barGraphConfig, setBarGraphConfig] = useState({
    title: "Bookings",
    value: "0",
    btnText: "Open Bookings",
    btnLink: "/dashboard/vendorBookings",
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
      title: role === "vendor" ? "Earnings" : "Vendors",
      value: role === "vendor" ? "INR 0" : "0",
      btnText: role === "vendor" ? "Open Earnings" : "Open Vendors",
      btnLink: role === "vendor" ? "/dashboard/vendorEarnings" : "/dashboard/vendors",
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

      if (userDetails.roles === "vendor") {
        data.forEach((series) => {
          totalValue += series.baseprice;
          const date = moment(series.createdAt).format("DD MMM, YYYY");
          const index = days.findIndex((val) => val === date);
          seriesData[index] += series.baseprice;
        });
      } else if (userDetails.roles === "admin") {
        let obj = {};
        data.forEach((series) => {
          const date = moment(series.createdAt).format("DD MMM, YYYY");
          const index = days.findIndex((val) => val === date);

          if (obj.hasOwnProperty(date)) {
            obj[date] += 1;
          } else {
            obj[date] = 1;
          }

          seriesData[index] = obj[date];
        });
      }

      setLineChartConfigs({
        title: role === "vendor" ? "Earnings" : "Vendors",
        value: role === "vendor" ? `INR ${totalValue}` : data.length,
        btnText: role === "vendor" ? "Open Earnings" : "Open Vendors",
        btnLink: role === "vendor" ? "/dashboard/vendorEarnings" : "/dashboard/vendors",
        xaxis: {
          categories: days,
        },
        series: [
          {
            name: userDetails.roles === "vendor" ? "Earnings" : "Vendors",
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
    } else if (userDetails.roles === "admin") {
      const data = await ApiContext.getData(API_URLS.FETCH_ALL_VENDORS, { headers });
      return data;
    }
  };

  const generateBarGraphSeries = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      let seriesData = [0, 0, 0, 0, 0, 0, 0];

      if (userDetails.roles === "vendor") {
        let obj = {};

        data.forEach((series, i) => {
          const date = moment(series.createdAt).format("DD MMM, YYYY");
          const index = days.findIndex((val) => val === date);

          if (obj.hasOwnProperty(date)) {
            obj[date] += 1;
          } else {
            obj[date] = 1;
          }

          seriesData[index] = obj[date];
        });
      }

      setBarGraphConfig({
        title: "Bookings",
        value: data.length,
        btnText: "Open Bookings",
        btnLink: "/dashboard/vendorBookings",
        xaxis: {
          categories: days,
        },
        series: [
          {
            name: "Bookings",
            data: seriesData,
          },
        ],
      });
    }
  };

  const fetchBarGraphData = async () => {
    const response = await catchHandler(fetchBarGraphDataAPI);
    generateBarGraphSeries(response);
  };

  const fetchBarGraphDataAPI = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (userDetails.roles === "vendor") {
      const data = await ApiContext.getData(API_URLS.FETCH_VENDOR_BOOKINGS, { headers });
      return data;
    }
  };

  useEffect(() => {
    last7days();
    fetchLineChartData();
    fetchBarGraphData();
  }, []);

  return (
    <div className="dashboardContainer container">
      <h2 className="dashboardContainer__greetings">Hello {userDetails.firstName},</h2>

      <div className="d-flex align-items-center justify-content-start mt-4">
        {/* <DashboardCard />
        <DashboardCard />
        <DashboardCard /> */}
      </div>

      <DashboardLineChart {...lineChartConfigs} />
      {userDetails.roles === "vendor" && <DashboardBarChart {...barGraphConfig} />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  userDetails: selectUserDetails,
});

export default connect(mapStateToProps)(DashboardContainer);
