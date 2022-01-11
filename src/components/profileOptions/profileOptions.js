import React from "react";
import { Dropdown } from "react-bootstrap";

import "./profileOptions.scss";

import { Link } from "react-router-dom";

const ProfileOptions = ({ firstName, roles, profileImage }) => {
  let menuOptions = [];

  switch (roles) {
    case "user":
      menuOptions = [
        { label: "Profile", link: "/profile" },
        { label: "Bookings", link: "/bookings" },
      ];
      break;

    case "admin":
      menuOptions = [
        { label: "Dashboard", link: "/dashboard" },
        { label: "Services", link: "/dashboard/services" },
        { label: "Vendors", link: "/dashboard/vendors" },
      ];
      break;

    default:
      menuOptions = [];
      break;
  }

  return (
    <Dropdown className="ml-3 profileOptionsDropdown">
      <Dropdown.Toggle>
        <div className="d-flex align-items-center justify-content-center">
          <div className="profileOptionsDropdown__img">
            <img src={profileImage} alt="Profile" />
          </div>
          <span>Hi, {firstName}</span>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {menuOptions.map((option, index) => (
          <Dropdown.Item as="button" key={index}>
            <Link to={option.link}>{option.label}</Link>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileOptions;
