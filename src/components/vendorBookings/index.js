import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setToasterConfig } from "../../redux/toaster/toaster.actions";
import { selectToken } from "../../redux/user/user.selectors";
import { ApiCallsContext } from "../../services/api.service";
import { catchHandler } from "../../utlis/catchHandler.utlis";
import { API_URLS } from "../../utlis/constants";
import Table from "../atmoic/table";

const VendorBookings = ({ userToken, setToasterCofig }) => {
  const ApiContext = useContext(ApiCallsContext);

  const [tableData, setTableData] = useState({
    tableName: "vendorsBookings",
    tableTitle: "Bookings for You,",
    filters: [],
    records: {
      headers: ["No.", "Name", "Place", "Service", "Date", "Status", "Actions"],
      data: [],
    },
    actionsOptions: [
      { label: "Complete", value: "completed" },
      { label: "Active", value: "active" },
    ],
  });

  const onActionoptionChange = async (id, data) => {
    const response = await catchHandler(() => statusChangeAPI(id, data));

    if (response) {
      fetchBookings();
      setToasterCofig({
        show: true,
        message: "Booking updated successfully",
        className: "success",
      });
    }
  };

  const statusChangeAPI = async (id, status) => {
    const postObj = {
      status,
      id,
    };

    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    const data = await ApiContext.postData(API_URLS.TOGGLE_BOOKING_STATUS, postObj, { headers });

    return data;
  };

  const fetchBookings = async () => {
    const response = await catchHandler(fetchBookingsAPI);

    if (Array.isArray(response) && response.length > 0) {
      let records = [];
      response.forEach((booking, index) => {
        const user = booking.userID;
        const service = booking.serviceID;

        records.push({
          id: booking._id,
          name: `${user.firstName} ${user.lastName}`,
          place: `${user.city}, ${user.state}`,
          service: service.name,
          date: `${moment(booking.createdAt).format("Do MMM, YYYY")}`,
          status: booking.status,
        });
      });
      setTableData({
        tableName: "vendorsBookings",
        tableTitle: "Bookings for You,",
        filters: [],
        records: {
          headers: ["No.", "Name", "Place", "Service", "Date", "Status", "Actions"],
          data: records,
        },
        actionsOptions: [
          { label: "Complete", value: "completed" },
          { label: "Active", value: "active" },
          { label: "Received", value: "received" },
        ],
        onActionoptionChange,
      });
    }
  };

  const fetchBookingsAPI = async () => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    const data = await ApiContext.getData(API_URLS.FETCH_VENDOR_BOOKINGS, { headers });
    return data;
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return <Table tableData={tableData} />;
};

const mapStateToProps = createStructuredSelector({
  userToken: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
  setToasterCofig: (config) => dispatch(setToasterConfig(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorBookings);
