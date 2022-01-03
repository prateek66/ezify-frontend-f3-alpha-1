import React from "react";
import "./vendorTile.scss";

import CustomButton from "../atmoic/customButton/customButton";

import vendorProfile from "./../../assets/service_page/vendor.svg";
import ratingStar from "./../../assets/service_page/star.svg";
import rupee from "./../../assets/service_page/rupee.svg";

const VendorTile = () => {
  const buttonAttributes = {
    type: "button",
    text: "BOOK NOW",
  };

  return (
    <div className="row vendorTile">
      <div className="col-2 d-flex align-items-center justify-content-center">
        <img src={vendorProfile} alt="Vendor Profile" />
      </div>
      <div className="col-4">
        <div className="d-flex align-items-center justify-content-between vendorTile__nameRatings">
          <div className="vendorTile__name">Anmol Laundry</div>
          <div className="d-flex align-items-center justify-content-between vendorTile__ratings">
            <img src={ratingStar} alt="Rating" />
            <span>4.99</span>
          </div>
        </div>
        <div className="vendorTile__timing">
          <div>Monday-Friday</div>
          <div>10AM-8PM</div>
        </div>
        <div className="d-flex align-items-center justify-content-between vendorTile__pricing">
          <img src={rupee} alt="Rupee Symbol" />
          <span>140 Rs.</span>
        </div>
      </div>
      <div className="col-3 offset-3 d-flex align-items-center justify-content-center">
        <CustomButton {...buttonAttributes} />
      </div>
    </div>
  );
};

export default VendorTile;
