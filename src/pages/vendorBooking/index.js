import React, { useState } from "react";
import "./vendorBooking.scss";

import serviceIcon from "./../../assets/dashboard/serviceIconGreen.svg";

const VendorBooking = () => {
  // VENDOR-BOOKING
  const bookingforYou = [
    {
      table_title: "Booking For You,",
      filter_data: [
        { title: "All Bookings", value: "104", active: true },
        { title: "Pending Status", value: "10", active: false },
        { title: "Pending Status", value: "94", active: false },
      ],
      table_data: [
        {
          headers: ["No.", "Name", "Place", "Services", "Date", "Status"],
          data: [
            { Name: "Harish Ramu", Place: "Chennai, Tamilnadu", Services: "7202087545", Date: "20 Dec, 2021", Status: "Pending" },
            { Name: "Harish Ramu", Place: "Chennai, Tamilnadu", Services: "7202087545", Date: "20 Dec, 2021", Status: "Success" },
            { Name: "Harish Ramu", Place: "Chennai, Tamilnadu", Services: "7202087545", Date: "20 Dec, 2021", Status: "Success" },
          ],
        },
        // {
        //   headers: ["No.", "Name", "Place", "Services", "Date", "Amount"],
        //   data: [
        //     { Name: "Harish Ramu", Place: "Chennai, Tamilnadu", Services: "7202087545", Date: "20 Dec, 2021", Amount: "₹ 500.00" },
        //     { Name: "Harish Ramu", Place: "Chennai, Tamilnadu", Services: "7202087545", Date: "20 Dec, 2021", Amount: "₹ 500.00" },
        //     { Name: "Harish Ramu", Place: "Chennai, Tamilnadu", Services: "7202087545", Date: "20 Dec, 2021", Amount: "₹ 500.00" },
        //   ],
        // },
      ],
    },
  ];

  // VENDOR-EARNINGS
  const EarningforYou = [];

  // ADMIN-VENDOR-LIST
  const VendorsforYou = [];

  const [bookingData, setbookingData] = useState([]);

  return (
    <div className="custom-dynamic-page px-3 px-lg-0">
      {bookingforYou.map((mainOuterData, index) => (
        <div key={index} className="container">
          <div className="row py-4">
            <div className="col-12 custom-dynamic-page__heading-text">{mainOuterData.table_title}</div>
          </div>
          <div className="row">
            {mainOuterData.filter_data.map((filterData, index) => (
              <div key={index} className="col-3">
                <div className={`custom-dynamic-page__filter-box ${filterData.active ? "custom-dynamic-page__filter-box_filter-active" : ""}`}>
                  <div className="d-flex align-items-center justify-content-center custom-dynamic-page__filter-box_icon">
                    <img src={serviceIcon} alt="Service Icon" />
                  </div>
                  <div className="mr-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="custom-dynamic-page__filter-box_title">{filterData.title}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start">
                      <span className="custom-dynamic-page__filter-box_value">{filterData.value}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="custom-dynamic-page__custom-table row my-3">
            {mainOuterData.table_data.map((value, index) => (
              <table key={index} className="table custom-dynamic-page__custom-table_table-margin mt-0 mb-0">
                <thead>
                  <tr>
                    {value.headers.map((value, index) => (
                      <th key={index} className="custom-dynamic-page__custom-table_header-elements">
                        {value}
                      </th>
                    ))}
                  </tr>
                </thead>
                {value.data.length > 0 && (
                  <tbody>
                    {value.data.map((tableValues, tableValuesindex) => (
                      <tr key={tableValuesindex}>
                        {value.headers.map((tableHeaders, tableHeadersindex) => (
                          <td
                            className={`${tableValuesindex % 2 !== 0 ? "even-row" : ""} 
                            ${
                              tableHeaders === "Status"
                                ? tableValues["Status"] === "Pending"
                                  ? "status-color-pending"
                                  : tableValues["Status"] === "Success"
                                  ? "status-color-success"
                                  : ""
                                : ""
                            } ${tableHeaders === "Amount" ? "status-color-success" : ""} `}
                            key={tableHeadersindex}
                          >
                            {tableValues[tableHeaders] ? tableValues[tableHeaders] : tableValuesindex + 1}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                )}
                {value.data.length === 0 && (
                  <tbody>
                    <tr>
                      <td colSpan={`${value.headers.length}`}>No Data Found</td>
                    </tr>
                  </tbody>
                )}
              </table>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VendorBooking;
