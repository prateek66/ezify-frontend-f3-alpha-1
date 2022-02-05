import React, { useEffect, useState } from "react";
import "./vendorTile.scss";

import CustomButton from "../atmoic/customButton/customButton";

import rupee from "./../../assets/service_page/rupee.webp";
import { createStructuredSelector } from "reselect";
import { selectCartItems, selectCartItemsServices, selectCartItemsVendors } from "../../redux/cart/cart.selectors";
import { connect } from "react-redux";
import { removeFromCart, setItemToCart } from "../../redux/cart/cart.actions";
import ModalBase from "../atmoic/modal/modal";
import { Modal } from "react-bootstrap";
import { selectUserDetails } from "../../redux/user/user.selectors";

const VendorTile = ({
  profileImage,
  firstName,
  lastName,
  serviceId,
  services,
  _id,
  cartItems,
  addItemToCart,
  removeItemFromCart,
  serviceName,
  availabaleDate,
  availableTime,
  userDetails,
}) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("You can not add multiple vendors for the same service");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectedService = services.find((service) => service.serviceID === serviceId);

  const handleBookNow = () => {
    if (userDetails?.roles === "vendor" || userDetails?.roles === "admin") {
      setShow(true);
      setMessage("Vendor can not add another vendor");
      return;
    }

    addItemToCart({
      vendorID: _id,
      serviceID: serviceId,
      active: true,
      profileImage,
      firstName,
      lastName,
      serviceName,
      basePrice: selectedService.basePrice,
    });
  };

  const handleCancel = () => {
    setbtnAttributes({
      type: "button",
      text: "BOOK NOW",
      onClick: handleBookNow,
    });
    removeItemFromCart(serviceId);
  };

  useEffect(() => {
    cartItems.forEach((item, index) => {
      if (item.serviceID === serviceId && item.vendorID === _id) {
        setbtnAttributes({
          type: "button",
          text: "CANCEL",
          onClick: handleCancel,
        });

        if (btnAttributes.text === "CANCEL") {
          setShow(true);
          setMessage("You can not add multiple vendors for the same service");
        }
      }
    });
  }, [cartItems]);

  const [btnAttributes, setbtnAttributes] = useState({
    type: "button",
    text: "BOOK NOW",
    onClick: handleBookNow,
  });

  return (
    <>
      <div className="row vendorTile mb-2">
        <div className="col-2 d-flex align-items-center justify-content-center vendorTile__IMG">
          <img src={profileImage} alt="Vendor Profile" className="h-100 w-100 vendorTile__profile" />
        </div>
        <div className="col-5">
          <div className="d-flex align-items-center justify-content-between vendorTile__nameRatings">
            <div className="vendorTile__name">
              {firstName} {lastName}
            </div>
            {/* <div className="d-flex align-items-center justify-content-between vendorTile__ratings">
              <img src={ratingStar} alt="Rating" />
              <span>4.99</span>
            </div> */}
          </div>
          <div className="vendorTile__timing">
            <div>{availabaleDate}</div>
            <div>{availableTime}</div>
          </div>
          <div className="d-flex align-items-center justify-content-between vendorTile__pricing">
            <img src={rupee} alt="Rupee Symbol" />
            <span>{selectedService.basePrice} Rs.</span>
          </div>
        </div>
        <div className="col-3 offset-2 d-flex align-items-center justify-content-center">
          <CustomButton {...btnAttributes} />
        </div>
      </div>

      <ModalBase show={show} handleClose={handleClose} handleShow={handleShow} size="md">
        <Modal.Header closeButton>💥 Warning</Modal.Header>
        <Modal.Body>
          <p className="mb-0 text-center font-weight-bold">{message}</p>
        </Modal.Body>
      </ModalBase>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartItemsVendors: selectCartItemsVendors,
  cartItemsService: selectCartItemsServices,
  userDetails: selectUserDetails,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(setItemToCart(item)),
  removeItemFromCart: (serviceID) => dispatch(removeFromCart(serviceID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorTile);
