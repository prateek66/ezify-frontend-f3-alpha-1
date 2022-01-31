import React, { useState } from "react";
import { connect } from "react-redux";

import "./sidebar.scss";

import hamburgerMenu from "./../../assets/dashboard/hamburger-menu.webp";
import personIcon from "./../../assets/dashboard/personIcon.webp";
import serviceIcon from "./../../assets/dashboard/serviceIcon.webp";
import earningsIcon from "./../../assets/dashboard/earningsIcon.webp";

import { createStructuredSelector } from "reselect";
import { selectUserDetails } from "../../redux/user/user.selectors";
import { Link, NavLink } from "react-router-dom";

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
          path: "/dashboard/vendors",
          icon: personIcon,
        },
      ];
      break;

    case "vendor":
      sidebarMenuOptions = [
        {
          label: "Dashboard",
          path: "/dashboard",
          icon: personIcon,
        },
        {
          label: "Bookings",
          path: "/dashboard/vendorBookings",
          icon: serviceIcon,
        },
        {
          label: "Earnings",
          path: "/dashboard/vendorEarnings",
          icon: earningsIcon,
        },
      ];
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
            <div className="sidebar__logo-container--box">Ezzify</div>
          </Link>
        )}
        <img src={hamburgerMenu} alt="hamburgerMenu" className="sidebar__logo-container--toogle-img" onClick={onToggle} />
      </div>

      <ul className="sidebar__menuList">
        {sidebarMenuOptions.map((option, index) => (
          <NavLink key={index} to={option.path} exact activeClassName="sidebar__menuList--item-selected" className="sidebar__menuList--item">
            <li className="sidebar__menuList--item--li">
              <div className="row">
                <div className="col-3">
                  <img src={option.icon} alt="Icon" className={toggle ? "" : "mr-0"} />
                </div>
                <div className="col-9">{toggle && <span>{option.label}</span>}</div>
              </div>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userDetails: selectUserDetails,
});

export default connect(mapStateToProps, null)(Sidebar);
