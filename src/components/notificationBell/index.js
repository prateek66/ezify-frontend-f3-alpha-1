import React, { useEffect, useContext } from "react";
import { io } from "socket.io-client";

import { ApiCallsContext } from "../../services/api.service";

import "./notificationBell.scss";

import Bell from "./../../assets/header/bell.svg";
import { API_URLS } from "../../utlis/constants";
import { catchHandler } from "../../utlis/catchHandler.utlis";

const NotificationBell = ({ userDetails, token }) => {
  const ApiContext = useContext(ApiCallsContext);

  const socket = io(API_URLS.SOCKET_END_POINT, {
    transports: ["websocket", "polling"],
    path: "/mysocket/",
  });

  const fetchNotifications = async () => {
    const response = await catchHandler(fetchNotificationsAPI);
    console.log(response);
  };

  const fetchNotificationsAPI = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = await ApiContext.getData(API_URLS.FETCH_NOTIFICATIONS, { headers });
    return data;
  };

  socket.emit("join", userDetails._id);

  console.log(socket);

  socket.on("NEW_ORDER", (data) => {
    console.log("event triggerd");
    console.log(data);
    fetchNotifications();
  });

  return (
    <div className="mr-3 notificationBell">
      <img src={Bell} alt="Notification bell" className="notificationBell--bell" />
    </div>
  );
};

export default NotificationBell;
