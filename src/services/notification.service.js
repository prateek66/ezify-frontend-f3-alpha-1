import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToken, selectUserDetails } from "../redux/user/user.selectors";
import { io } from "socket.io-client";
import { API_URLS } from "../utlis/constants";
import { ApiCallsContext } from "./api.service";
import { catchHandler } from "../utlis/catchHandler.utlis";
import { setToasterConfig } from "../redux/toaster/toaster.actions";

export const NotificationServiceContext = React.createContext();

const NotificationContext = ({ children, userDetails, token, setToasterCofig }) => {
  const [notifications, setNotifications] = useState([]);

  const socket = io(API_URLS.SOCKET_END_POINT, {
    transports: ["websocket", "polling"],
     path: "/socket/mysocket/",
    //path: "/mysocket/",
  });

  const ApiContext = useContext(ApiCallsContext);

  const fetchNotifications = async () => {
    const response = await catchHandler(fetchNotificationsAPI);
    if (Array.isArray(response) && response.length > 0) {
      setNotifications(response);
      setToasterCofig({
        show: true,
        message: "You have new notifications",
        className: "success",
      });
    }
  };

  const fetchNotificationsAPI = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = await ApiContext.getData(API_URLS.FETCH_NOTIFICATIONS, { headers });
    return data;
  };

  const markAllAsRead = async () => {
    const response = await catchHandler(markAllAsReadAPI);
    setNotifications([]);
    console.log(response);
  };

  const markAllAsReadAPI = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = await ApiContext.getData(API_URLS.MARK_AS_READ_NOTIFICATION, { headers });
    return data;
  };

  useEffect(() => {
    if (!userDetails) return;

    // setTimeout(() => {
    // }, 1000);
    fetchNotifications();

    socket.emit("join", userDetails._id);

    socket.on("NEW_ORDER", (data) => {
      console.log(data);
      fetchNotifications();
    });
  }, [userDetails?._id]);

  return <NotificationServiceContext.Provider value={{ notifications, markAllAsRead }}>{children}</NotificationServiceContext.Provider>;
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  userDetails: selectUserDetails,
});

const mapDispatchToProps = (dispatch) => ({
  setToasterCofig: (config) => dispatch(setToasterConfig(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContext);
