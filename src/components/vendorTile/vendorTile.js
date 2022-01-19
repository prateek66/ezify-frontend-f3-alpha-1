import React from "react";
import "./vendorTile.scss";

import CustomButton from "../atmoic/customButton/customButton";

import ratingStar from "./../../assets/service_page/star.svg";
import rupee from "./../../assets/service_page/rupee.svg";

const VendorTile = ({ profileImage, firstName, lastName, serviceId, services }) => {
  const buttonAttributes = {
    type: "button",
    text: "BOOK NOW",
  };

  const selectedService = services.find((service) => service.serviceID === serviceId);

  return (
    <div className="row vendorTile mb-2">
      <div className="col-2 d-flex align-items-center justify-content-center">
        <img src={profileImage} alt="Vendor Profile" className="h-100 w-100 vendorTile__profile" />
      </div>
      <div className="col-5">
        <div className="d-flex align-items-center justify-content-between vendorTile__nameRatings">
          <div className="vendorTile__name">
            {firstName} {lastName}
          </div>
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
          <span>{selectedService.basePrice} Rs.</span>
        </div>
      </div>
      <div className="col-3 offset-2 d-flex align-items-center justify-content-center">
        <CustomButton {...buttonAttributes} />
      </div>
    </div>
  );
};

export default VendorTile;
