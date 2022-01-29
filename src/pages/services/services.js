import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import "./services.scss";

import bannerPic from "./../../assets/service_page/banner-1.png";
import CustomButton from "../../components/atmoic/customButton/customButton";
import VendorTile from "../../components/vendorTile/vendorTile";
import { catchHandler } from "./../../utlis/catchHandler.utlis";
import { ApiCallsContext } from "../../services/api.service";
import { API_URLS } from "../../utlis/constants";
import Cart from "../../components/cart";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { connect } from "react-redux";

const Services = ({ cartItems }) => {
  const ApiContext = useContext(ApiCallsContext);
  const { name, serviceId, city } = useParams();

  const [vendors, setVendors] = useState([]);

  const buttonAttributes = {
    type: "button",
    text: "APPLY",
  };

  useEffect(() => {
    fetchVendors();
  }, [serviceId]);

  const fetchVendors = async () => {
    const response = await catchHandler(fetchServicesAPI);
    setVendors(response);
  };

  const fetchServicesAPI = async () => {
    const postObj = {
      serviceID: serviceId,
      city,
    };

    const data = await ApiContext.postData(API_URLS.FETCH_VENDORS, postObj);
    return data;
  };

  return (
    <>
      <div className="services">
        <div className="services__banner">
          <img src={bannerPic} alt="Banner" />
          <h2 className="services__banner--text">{name} Services</h2>
        </div>
        <div className="services__listing-container container">
          <div className="row">
            <div className="col-4">
              <div className="services__filter-box services__filter-box--1">
                <div className="services__filter-box--title">Sort By</div>
                <div className="services__filter-box--options">Price: High to Low</div>
                <div className="services__filter-box--options">Price: Low to High</div>
                {/* <div className="services__filter-box--options">Rating: High to Low</div>
                <div className="services__filter-box--options">Rating: Low to High</div> */}
              </div>

              {/* <div className="services__filter-box services__filter-box--2 mt-4">
                <div className="services__filter-box--title">Price Range</div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="d-flex align-items-center justify-content-between flex-grow-1 mr-3">
                    <input type="number" placeholder="MIN" className="form-control range-input" />
                    <span>TO</span>
                    <input type="number" placeholder="MAX" className="form-control range-input" />
                  </div>
                  <CustomButton {...buttonAttributes} />
                </div>
              </div> */}
            </div>
            <div className="col-8">
              {vendors.length > 0 &&
                vendors.map((vendor, index) => <VendorTile key={index} {...vendor} serviceId={serviceId} serviceName={name} cartItems={cartItems} />)}
              {vendors.length <= 0 && <h2 className="text-center">Sorry, No vendor found</h2>}
            </div>
          </div>
        </div>
      </div>
      {cartItems.length > 0 && <Cart />}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default connect(mapStateToProps)(Services);
