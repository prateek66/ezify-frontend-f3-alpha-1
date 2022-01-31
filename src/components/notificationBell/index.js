import React, { useEffect, useContext, useState } from "react";

import "./notificationBell.scss";

import Bell from "./../../assets/header/bell.webp";
import { Dropdown } from "react-bootstrap";
import NotificationList from "../notificationList";
import { NotificationServiceContext } from "../../services/notification.service";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);

  const NotificationsContext = useContext(NotificationServiceContext);

  useEffect(() => {
    console.log(NotificationsContext.notifications);
    setNotifications(NotificationsContext.notifications);

    if (notifications.length > 0) {
      let audio = new Audio("/notificationSound.wav");
      audio.play();
    }
  }, [NotificationsContext.notifications]);

  return (
    <div className="mr-3 notificationBell">
      <Dropdown className="ml-3">
        <Dropdown.Toggle>
          <img src={Bell} alt="Notification bell" id="notification--bell" className="notificationBell--bell" />
          {notifications.length > 0 && <div className="notificationBell__count">{notifications.length}</div>}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <NotificationList notifications={notifications} />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default NotificationBell;
