import React, { useContext, useEffect, useState } from "react";
import "./bookings.scss";

import rupeeIcon from "./../../assets/service_page/rupee.webp";
import { ApiCallsContext } from "../../services/api.service";
import { catchHandler } from "../../utlis/catchHandler.utlis";
import { createStructuredSelector } from "reselect";
import { selectToken } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { API_URLS } from "../../utlis/constants";
import CustomPagination from "../../components/atmoic/customPagination";

const Bookings = ({ userToken }) => {
  const ApiContext = useContext(ApiCallsContext);

  const [active, setactive] = useState(true);
  const [bookingData, setbookingData] = useState([]);
  const [activeBookngs, setActiveBookngs] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const changeActiveState = () => {
    if (active) {
      setbookingData(activeBookngs);
    } else {
      setbookingData(historyBookings);
    }
  };

  const fetchActiveBookings = async () => {
    const response = await catchHandler(fetchActiveBookingAPI);

    if (response) {
      let activeBookingRecords = [];
      let historyBookingRecords = [];

      if (Array.isArray(response) && response.length > 0) {
        response.forEach((booking) => {
          if (booking.status === "completed") {
            historyBookingRecords.push(booking);
          } else if (booking.status === "active" || booking.status === "received") {
            activeBookingRecords.push(booking);
          }
          // booking.bookings.forEach((bookingObj) => {
          //   if (bookingObj.status === "completed") {
          //     historyBookingRecords.push(bookingObj);
          //   } else if (bookingObj.status === "active") {
          //     activeBookingRecords.push(bookingObj);
          //   }
          // });
        });

        setActiveBookngs(activeBookingRecords);
        setHistoryBookings(historyBookingRecords);

        changeActiveState();
      }
    }
  };

  const fetchActiveBookingAPI = async () => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    const data = await ApiContext.getData(API_URLS.GET_ALL_BOOKINGS, { headers });
    return data;
  };

  useEffect(() => {
    fetchActiveBookings();
  }, []);

  useEffect(() => {
    changeActiveState();
    setPage(1);
    console.log(bookingData);
  }, [active, activeBookngs, historyBookings]);

  return (
    <div className="booking-page px-3 px-lg-0">
      <div className="container">
        <div className="row py-4">
          <div className="col-12 booking-page__heading-text">MY BOOKINGS</div>
        </div>
        <div className="row booking-page__toggle-tab">
          <div
            onClick={() => setactive(!active)}
            className={`col-6 text-center booking-page__toggle-tab_tabs ${active ? "booking-page__toggle-tab_tabs-active" : ""}`}
          >
            ACTIVE
          </div>
          <div
            onClick={() => setactive(!active)}
            className={`col-6 text-center booking-page__toggle-tab_tabs ${!active ? "booking-page__toggle-tab_tabs-active" : ""}`}
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
                {bookingData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize).map((value, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center justify-content-center booking-page__custom-table__icons">
                        {/* <img src={avatarIcon} alt="avatarIcon" className="mr-3" /> */}
                        {value.serviceID.name}
                      </div>
                    </td>
                    <td>
                      {value.vendorID.firstName} {value.vendorID.lastName}
                    </td>
                    <td>+91 {value.vendorID.mobileNumber}</td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center booking-page__custom-table__icons">
                        <img src={rupeeIcon} alt="rupeeIcon" className="mr-3" />
                        {value.baseprice}
                      </div>
                    </td>
                    <td className={`text-uppercase ${value.status === "active" ? "status-color-active" : "status-color-done"}`}>{value.status}</td>
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
        <div className="d-flex align-items-center justify-content-end mt-4">
          <CustomPagination records={bookingData} pageSize={pageSize} page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userToken: selectToken,
});

export default connect(mapStateToProps)(Bookings);
