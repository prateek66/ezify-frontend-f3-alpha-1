import React, { useState } from "react";
import { connect } from "react-redux";

import "./sidebar.scss";

import hamburgerMenu from "./../../assets/dashboard/hamburger-menu.svg";
import personIcon from "./../../assets/dashboard/personIcon.svg";
import serviceIcon from "./../../assets/dashboard/serviceIcon.svg";

import { createStructuredSelector } from "reselect";
import { selectUserDetails } from "../../redux/user/user.selectors";
import { Link } from "react-router-dom";

const Sidebar = ({ userDetails }) => {
  const [toggle, setToggle] = useState(true);

  let sidebarMenuOptions = [];

  switch (userDetails.roles) {
    case "admin":
      sidebarMenuOptions = [
        {
          label: "Dashboard",
          path: "/dashboard",
          icon: personIcon,
        },
        {
          label: "Services",
          path: "/dashboard/services",
          icon: serviceIcon,
        },
        {
          label: "Vendors",
          path: "/dashboard",
          icon: personIcon,
        },
      ];
      break;

    case "vendor":
      break;

    default:
      sidebarMenuOptions = [];
      break;
  }

  const onToggle = () => {
    setToggle(!toggle);
    const sideBar = document.getElementById("sidebar");

    if (toggle) {
      sideBar.style.width = "5rem";
    } else {
      sideBar.style.width = "15rem";
    }
  };

  return (
    <div className="sidebar" id="sidebar">
      <div className={`sidebar__logo-container d-flex align-items-center ${toggle ? "justify-content-between" : "justify-content-center"}`}>
        {toggle && (
          <Link to="/">
            <div className="sidebar__logo-container--box">Logo</div>
          </Link>
        )}
        <img src={hamburgerMenu} alt="hamburgerMenu" className="sidebar__logo-container--toogle-img" onClick={onToggle} />
      </div>

      <ul className="sidebar__menuList">
        {sidebarMenuOptions.map((option, index) => (
          <li className="sidebar__menuList--item" key={index}>
            <Link to={option.path}>
              <div className="row">
                <div className="col-3">
                  <img src={option.icon} alt="Icon" className={toggle ? "" : "mr-0"} />
                </div>
                <div className="col-9">{toggle && <span>{option.label}</span>}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userDetails: selectUserDetails,
});

export default connect(mapStateToProps, null)(Sidebar);
