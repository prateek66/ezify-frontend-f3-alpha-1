import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Table from "../../components/atmoic/table";

import { selectToken } from "../../redux/user/user.selectors";
import { ApiCallsContext } from "../../services/api.service";
import { catchHandler } from "../../utlis/catchHandler.utlis";
import { API_URLS } from "../../utlis/constants";

import "./orders.scss";

const moment = require("moment");

const Orders = ({ userToken }) => {
  const ApiContext = useContext(ApiCallsContext);

  const [tableData, setTableData] = useState({
    tableName: "orders",
    tableTitle: "My Orders",
    filters: [],
    records: {
      headers: ["No.", "Name", "Service", "Amount", "Date"],
      data: [],
    },
  });

  const fetchOrders = async () => {
    const response = await catchHandler(fetchOrdersAPI);

    if (Array.isArray(response) && response.length > 0) {
      let records = [];
      response.forEach((order, index) => {
        records.push({
          id: order._id,
          name: `${order.vendor_info[0]["firstName"]} ${order.vendor_info[0]["lastName"]}`,
          service: `${order.service_info[0]["name"]}`,
          amount: `${order.baseprice}`,
          date: `${moment(order.createdAt).format("Do MMM, YYYY hh:mm A")}`,
        });
      });

      setTableData({
        tableName: "orders",
        tableTitle: "My Orders",
        filters: [],
        records: {
          headers: ["No.", "Name", "Service", "Amount", "Date"],
          data: records,
        },
      });
    }
  };

  const fetchOrdersAPI = async () => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    const data = await ApiContext.getData(API_URLS.GET_ALL_ORDERS, { headers });
    return data;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Table tableData={tableData} />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  userToken: selectToken,
});

export default connect(mapStateToProps)(Orders);
