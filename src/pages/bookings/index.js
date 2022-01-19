import React, { useState } from "react";
import "./bookings.scss";

import avatarIcon from "./../../assets/profile/avatar-1.svg";
import rupeeIcon from "./../../assets/service_page/rupee.svg";

const Bookings = () => {
  const [active, setactive] = useState(false);
  const [bookingData, setbookingData] = useState([]);

  const changeActiveState = () => {
    setactive(!active);
    if (!active) {
      setbookingData([{ service: "LAUNDARY", vendor_name: "Harshit", number: "7202087545", amount: "230", status: "ACTIVE" }]);
    } else {
      setbookingData([
        { service: "LAUNDARY", vendor_name: "CP", number: "7202087545", amount: "230", status: "ACTIVE" },
        { service: "LAUNDARY", vendor_name: "CP", number: "7202087545", amount: "230", status: "IN-PROCESS" },
        { service: "LAUNDARY", vendor_name: "CP", number: "7202087545", amount: "230", status: "DONE" },
      ]);
    }
  };

  return (
    <div className="booking-page px-3 px-lg-0">
      <div className="container">
        <div className="row py-4">
          <div className="col-12 booking-page__heading-text">MY BOOKINGS</div>
        </div>
        <div className="row booking-page__toggle-tab">
          <div
            onClick={changeActiveState}
            className={`col-6 text-center booking-page__toggle-tab_tabs ${!active ? "booking-page__toggle-tab_tabs-active" : ""}`}
          >
            ACTIVE
          </div>
          <div
            onClick={changeActiveState}
            className={`col-6 text-center booking-page__toggle-tab_tabs ${active ? "booking-page__toggle-tab_tabs-active" : ""}`}
          >
            HISTORY
          </div>
        </div>
        <div className="booking-page__custom-table row my-3">
          <table className="table booking-page__custom-table_table-margin mt-0 mb-0">
            <thead>
              <tr>
                <th width="20%" className="booking-page__custom-table_header-elements">
                  SERVICE
                </th>
                <th width="20%" className="booking-page__custom-table_header-elements">
                  VENDOR NAME
                </th>
                <th width="20%" className="booking-page__custom-table_header-elements">
                  VENDOR PH. NO.
                </th>
                <th width="18%" className="booking-page__custom-table_header-elements">
                  AMOUNT
                </th>
                <th width="18%" className="booking-page__custom-table_header-elements">
                  STATUS
                </th>
              </tr>
            </thead>
            {bookingData.length > 0 && (
              <tbody>
                {bookingData.map((value, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center justify-content-center booking-page__custom-table__icons">
                        <img src={avatarIcon} alt="avatarIcon" className="mr-3" />
                        {value.service}
                      </div>
                    </td>
                    <td>{value.vendor_name}</td>
                    <td>+91 {value.number}</td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center booking-page__custom-table__icons">
                        <img src={rupeeIcon} alt="rupeeIcon" className="mr-3" />
                        {value.amount}
                      </div>
                    </td>
                    <td
                      className={`${
                        value.status === "ACTIVE"
                          ? "status-color-active"
                          : value.status === "IN-PROCESS"
                          ? "status-color-in-process"
                          : "status-color-done"
                      }`}
                    >
                      {value.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
            {bookingData.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan="5">No Booking Data Found</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
