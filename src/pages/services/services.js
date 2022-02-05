import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import "./services.scss";

import bannerPic from "./../../assets/service_page/banner-1.webp";
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
  const [bannerImg, setBannerImg] = useState(bannerPic);

  useEffect(() => {
    fetchVendors();
  }, [serviceId]);

  const fetchVendors = async () => {
    const response = await catchHandler(fetchServicesAPI);
    setVendors(response);

    // const selectedService = response.map((record) => record.services.find((service) => service.serviceID._id === serviceId));
    // setBannerImg(selectedService[0].serviceID.image);
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
          <img src={bannerImg} alt="Banner" />
          <h2 className="services__banner--text">{name} Services</h2>
        </div>
        <div className="services__listing-container container">
          <div className="row">
            {/* <div className="col-4">
              <div className="services__filter-box services__filter-box--1">
                <div className="services__filter-box--title">Sort By</div>
                <div className="services__filter-box--options">Price: High to Low</div>
                <div className="services__filter-box--options">Price: Low to High</div>
              </div>
            </div> */}
            <div className="col-8 mx-auto">
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
