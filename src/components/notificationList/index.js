import moment from "moment";
import React from "react";
import { Popover } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./notificationList.scss";

const NotificationList = ({ notifications }) => {
  return (
    <Popover placement="bottom">
      <Popover.Title as="h3">You have {notifications.length} unread notifications</Popover.Title>
      <Popover.Content className="customScroll p-0">
        {notifications.length === 0 && <p className="notificationTab text-center">No New Notifications</p>}

        {notifications.map((notification, index) => {
          switch (notification.type) {
            case "BOOKING_STATUS_CHANGED":
              return (
                <div className="notificationTab" key={index}>
                  <Link to="/bookings">
                    <small className="mb-0 text-right timestamp">{moment(notification.createdAt).format("DD MMM, YYYY hh:mm A")}</small>
                    <p className="mb-0">Your booking's status has been changed to {notification.data[0].data.status}</p>
                  </Link>
                </div>
              );

            case "VENDOR_CREATED":
              return (
                <div className="notificationTab" key={index}>
                  <Link to="/dashboard/vendors">
                    <small className="mb-0 text-right timestamp">{moment(notification.createdAt).format("DD MMM, YYYY hh:mm A")}</small>
                    <p className="mb-0">A new vendor has registered on ezzify</p>
                  </Link>
                </div>
              );

            case "NEW_BOOKING_CREATED":
              return (
                <div className="notificationTab" key={index}>
                  <Link to="/dashboard/vendorBookings">
                    <small className="mb-0 text-right timestamp">{moment(notification.createdAt).format("DD MMM, YYYY hh:mm A")}</small>
                    <p className="mb-0">You have a new booking</p>
                  </Link>
                </div>
              );

            default:
              return <p key={index}>"No status"</p>;
          }
        })}

        <audio data-key="76" src="sounds/tink.wav"></audio>
      </Popover.Content>
    </Popover>
  );
};

export default NotificationList;
