import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import moment from "moment";

import { selectToken } from "../../redux/user/user.selectors";
import { ApiCallsContext } from "../../services/api.service";
import { catchHandler } from "../../utlis/catchHandler.utlis";
import { API_URLS } from "../../utlis/constants";

import "./adminVendors.scss";
import { setToasterConfig } from "../../redux/toaster/toaster.actions";
import Table from "../atmoic/table";

const AdminVendors = ({ userToken, setToasterCofig }) => {
  const ApiContext = useContext(ApiCallsContext);

  const [tableData, setTableData] = useState({
    tableName: "vendors",
    tableTitle: "Vendors for You,",
    filters: [],
    records: {
      headers: ["No.", "Name", "Email", "Status", "Date", "Last Updated", "Actions"],
      data: [],
    },
    actionsOptions: [
      { label: "Approve", value: "approved" },
      { label: "Reject", value: "rejected" },
    ],
  });

  const fetchVendors = async () => {
    const response = await catchHandler(fetchVendorsAPI);

    if (Array.isArray(response) && response.length > 0) {
      let records = [];
      response.forEach((vendor, index) => {
        records.push({
          id: vendor._id,
          name: `${vendor.firstName} ${vendor.lastName}`,
          email: `${vendor.email}`,
          status: vendor.isApproved,
          date: `${moment(vendor.createdAt).format("Do MMM, YYYY")}`,
          updatedDate: `${moment(vendor.updatedAt).format("Do MMM, YYYY")}`,
        });
      });

      setTableData({
        tableName: "vendors",
        tableTitle: "Vendors for You,",
        filters: [],
        records: {
          headers: ["No.", "Name", "Email", "Status", "Date", "Last Updated", "Actions"],
          data: records,
        },
        actionsOptions: [
          { label: "Approve", value: "approved" },
          { label: "Reject", value: "rejected" },
        ],
        onActionoptionChange,
      });
    }
  };

  const fetchVendorsAPI = async () => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    const data = await ApiContext.getData(API_URLS.FETCH_ALL_VENDORS, { headers });
    return data;
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const onActionoptionChange = async (id, data) => {
    const response = await catchHandler(() => statusChangeAPI(id, data));

    if (response) {
      fetchVendors();
      setToasterCofig({
        show: true,
        message: "Vendor updated successfully",
        className: "success",
      });
    }
  };

  const statusChangeAPI = async (id, isApproved) => {
    const path = `${API_URLS.TOGGLE_VENDOR_APPROVE_STATUS}/${id}`;

    const postObj = {
      isApproved,
    };

    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    const data = await ApiContext.postData(path, postObj, { headers });

    return data;
  };

  return (
    <>
      <Table tableData={tableData} />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  userToken: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
  setToasterCofig: (config) => dispatch(setToasterConfig(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminVendors);
