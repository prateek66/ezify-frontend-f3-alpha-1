import React, { useEffect } from "react";
import { io } from "socket.io-client";

import "./notificationBell.scss";

import Bell from "./../../assets/header/bell.svg";
import { API_URLS } from "../../utlis/constants";

const NotificationBell = ({ userDetails }) => {
  const socket = io(API_URLS.SOCKET_END_POINT, {
    transports: ["websocket", "polling"],
    path: "/mysocket/",
  });

  useEffect(() => {
    console.log(socket);
    if (!userDetails._id) return;

    socket.emit("join", userDetails._id);
    socket.on("NEW_ORDER", (data) => {
      console.log(data);
    });
  }, [userDetails]);

  return (
    <div className="mr-3 notificationBell">
      <img src={Bell} alt="Notification bell" className="notificationBell--bell" />
    </div>
  );
};

export default NotificationBell;
