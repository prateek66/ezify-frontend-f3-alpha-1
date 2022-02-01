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
    setNotifications(NotificationsContext.notifications);

    if (NotificationsContext.notifications.length > 0) {
      let audio = new Audio("/notificationSound.wav");
      audio.play();
    }
  }, [NotificationsContext.notifications]);

  const onToggle = async (e) => {
    if (!e && notifications.length > 0) {
      await NotificationsContext.markAllAsRead();
    }
  };

  return (
    <div className="mr-3 notificationBell">
      <Dropdown className="ml-3" onToggle={onToggle}>
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
