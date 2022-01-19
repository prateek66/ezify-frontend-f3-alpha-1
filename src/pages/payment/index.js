import React, { useState } from "react";
import "./payment.scss";

import CustomButton from "../../components/atmoic/customButton/customButton";

import vendorProfile from "./../../assets/service_page/vendor.svg";
import ratingStar from "./../../assets/service_page/star.svg";
import rupee from "./../../assets/service_page/rupee.svg";

const Payment = () => {
  const [paymentData] = useState([
    { service_name: "Laundary", vendor_name: "Anmol Laundry", rating: "4.99", amount: "230" },
    { service_name: "Laundary", vendor_name: "Anmol Laundry", rating: "4.99", amount: "230" },
    { service_name: "Laundary", vendor_name: "Anmol Laundry", rating: "4.99", amount: "230" },
  ]);

  return (
    <div className="payment-page px-3 px-lg-0">
      <div className="container">
        <div className="row py-4">
          <div className="col-12 payment-page__heading-text py-2">PAYMENT</div>
          <div className="col-lg-9 col-md-11 payment-page__custom-container mx-auto">
            {paymentData.map((value, index) => (
              <div key={index} className="col-12 py-4">
                <div className="row payment-page__vendorTile">
                  <div className="col-2 d-flex align-items-center justify-content-center">
                    <img src={vendorProfile} alt="Vendor Profile" />
                  </div>
                  <div className="col-4">
                    <div className="mb-2 d-flex align-items-center justify-content-start payment-page__vendorTile__icons">
                      <img src={vendorProfile} alt="avatarIcon" className="mr-2" />
                      {value.service_name}
                    </div>
                    <div className="d-flex align-items-center justify-content-between payment-page__vendorTile__nameRatings">
                      <div className="payment-page__vendorTile__name">{value.vendor_name}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start payment-page__vendorTile__ratings">
                      <img src={ratingStar} alt="Rating" />
                      <span>{value.rating}</span>
                    </div>
                  </div>
                  <div className="col-3 offset-3 d-flex align-items-end justify-content-between flex-column">
                    <div className="">
                      <input type="checkbox" className="custom-toggle-btn" />
                    </div>
                    <div className="d-flex align-items-center justify-content-between payment-page__vendorTile__pricing">
                      <img src={rupee} alt="Rupee Symbol" />
                      <span className="ml-2">{value.amount} Rs.</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="col-12 d-flex align-items-end justify-content-between flex-column mb-3">
              <div className="payment-page__final-pricing">
                <span className="">
                  <b>Total</b>
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between payment-page__vendorTile__pricing payment-page__final-pricing">
                <img src={rupee} alt="Rupee Symbol" />
                <span className="ml-2">420 Rs.</span>
              </div>
            </div>
            <div className="col-12 d-flex align-items-center justify-content-center">
              <CustomButton type="submit" text="PAY NOW" classes="cp-3 btn-block"></CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
