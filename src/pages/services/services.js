import React from "react";

import "./services.scss";

import bannerPic from "./../../assets/service_page/banner-1.png";
import CustomButton from "../../components/atmoic/customButton/customButton";
import VendorTile from "../../components/vendorTile/vendorTile";

const Services = () => {
  const buttonAttributes = {
    type: "button",
    text: "APPLY",
  };

  return (
    <div className="services">
      <div className="services__banner">
        <img src={bannerPic} alt="Banner" />
        <h2 className="services__banner--text">Laundry Services</h2>
      </div>
      <div className="services__listing-container container">
        <div className="row">
          <div className="col-4">
            <div className="services__filter-box services__filter-box--1">
              <div className="services__filter-box--title">Sort By</div>
              <div className="services__filter-box--options">Price: High to Low</div>
              <div className="services__filter-box--options">Price: Low to High</div>
              <div className="services__filter-box--options">Rating: High to Low</div>
              <div className="services__filter-box--options">Rating: Low to High</div>
            </div>

            <div className="services__filter-box services__filter-box--2 mt-4">
              <div className="services__filter-box--title">Price Range</div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div className="d-flex align-items-center justify-content-between flex-grow-1 mr-3">
                  <input type="number" placeholder="MIN" className="form-control range-input" />
                  <span>TO</span>
                  <input type="number" placeholder="MAX" className="form-control range-input" />
                </div>
                <CustomButton {...buttonAttributes} />
              </div>
            </div>
          </div>
          <div className="col-8">
            <VendorTile />
            <VendorTile />
            <VendorTile />
            <VendorTile />
            <VendorTile />
            <VendorTile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
