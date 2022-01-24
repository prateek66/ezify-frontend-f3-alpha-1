import React, { useEffect, useContext } from "react";
import { io } from "socket.io-client";

import { ApiCallsContext } from "../../services/api.service";

import "./notificationBell.scss";

import Bell from "./../../assets/header/bell.svg";
import { API_URLS } from "../../utlis/constants";
import { catchHandler } from "../../utlis/catchHandler.utlis";

const NotificationBell = ({ userDetails, token }) => {
  const ApiContext = useContext(ApiCallsContext);

  // const fetchBookings = async () => {
  //   const response = await catchHandler(fetchBookingsAPI);
  //   console.log(response);
  // };

  // const fetchBookingsAPI = async () => {
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //   };

  //   const data = await ApiContext.getData(API_URLS.FETCH_VENDOR_BOOKINGS, { headers });
  //   return data;
  // };

  // const socket = io(API_URLS.SOCKET_END_POINT, {
  //   transports: ["websocket", "polling"],
  //   path: "/mysocket/",
  // });

  // useEffect(() => {
  //   console.log(socket);
  //   if (!userDetails._id) return;

  //   socket.emit("join", userDetails._id);
  //   socket.on("NEW_ORDER", (data) => {
  //     console.log("event triggerd");
  //     console.log(data);
  //     // fetchBookings();
  //   });
  // }, [userDetails]);

  return (
    <div className="mr-3 notificationBell">
      <img src={Bell} alt="Notification bell" className="notificationBell--bell" />
    </div>
  );
};

export default NotificationBell;
