import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToken } from "../../redux/user/user.selectors";
import { ApiCallsContext } from "../../services/api.service";
import { catchHandler } from "../../utlis/catchHandler.utlis";
import { API_URLS } from "../../utlis/constants";
import Table from "../atmoic/table";

import "./vendorEarnings.scss";

const VendorEarnings = ({ userToken }) => {
  const ApiContext = useContext(ApiCallsContext);

  const [tableData, setTableData] = useState({
    tableName: "vendorsEarnings",
    tableTitle: "Earnings for You,",
    filters: [],
    records: {
      headers: ["No.", "Name", "Place", "Service", "Date", "Amount"],
      data: [],
    },
  });

  const fetchEarnings = async () => {
    const response = await catchHandler(fetchEarningsAPI);

    console.log(response);

    if (Array.isArray(response) && response.length > 0) {
      let records = [];
      response.forEach((earning, index) => {
        const userInfo = earning["user_info"][0];
        const serviceInfo = earning["service_info"][0];
        records.push({
          name: `${userInfo.firstName} ${userInfo.lastName}`,
          place: `${userInfo.city}, ${userInfo.state}`,
          service: serviceInfo.name,
          date: `${moment(earning.createdAt).format("Do MMM, YYYY")}`,
          amount: earning.baseprice,
        });
      });
      setTableData({
        tableName: "vendorsEarnings",
        tableTitle: "Earnings for You,",
        filters: [],
        records: {
          headers: ["No.", "Name", "Place", "Service", "Date", "Amount"],
          data: records,
        },
      });
    }
  };

  const fetchEarningsAPI = async () => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    const data = await ApiContext.getData(API_URLS.VIEW_ALL_EARNINGS, { headers });
    return data;
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  return <Table tableData={tableData} />;
};

const mapStateToProps = createStructuredSelector({
  userToken: selectToken,
});

export default connect(mapStateToProps)(VendorEarnings);
