import React from "react";
import { Dropdown } from "react-bootstrap";

import "./profileOptions.scss";

import Avatar from "./../../assets/profile/avatar-1.svg";
import { Link } from "react-router-dom";

const ProfileOptions = () => {
  return (
    <Dropdown className="ml-3 profileOptionsDropdown">
      <Dropdown.Toggle>
        <div className="d-flex align-items-center justify-content-center">
          <div className="profileOptionsDropdown__img">
            <img src={Avatar} alt="Profile" />
          </div>
          <span>Hi, Harshit</span>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as="button">
          <Link to="/profile">Profile</Link>
        </Dropdown.Item>
        <Dropdown.Item as="button">
          <Link to="/profile">Bookings</Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileOptions;
