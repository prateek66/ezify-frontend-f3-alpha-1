import React, { useEffect, useState } from "react";
import "./vendorTile.scss";

import CustomButton from "../atmoic/customButton/customButton";

import ratingStar from "./../../assets/service_page/star.svg";
import rupee from "./../../assets/service_page/rupee.svg";
import { createStructuredSelector } from "reselect";
import { selectCartItems, selectCartItemsVendors } from "../../redux/cart/cart.selectors";
import { connect } from "react-redux";
import { removeFromCart, setItemToCart } from "../../redux/cart/cart.actions";
import ModalBase from "../atmoic/modal/modal";
import { Modal } from "react-bootstrap";

const VendorTile = ({
  profileImage,
  firstName,
  lastName,
  serviceId,
  services,
  _id,
  cartItems,
  addItemToCart,
  cartItemsVendors,
  removeItemFromCart,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBookNow = () => {
    addItemToCart({
      vendorID: _id,
      serviceID: serviceId,
      active: true,
    });
  };

  const handleCancel = () => {
    removeItemFromCart(serviceId);
  };

  useEffect(() => {
    if (cartItemsVendors.includes(_id)) {
      setbtnAttributes({
        type: "button",
        text: "CANCEL",
        onClick: handleCancel,
      });

      if (btnAttributes.text === "CANCEL") {
        setShow(true);
      }
    } else {
      setbtnAttributes({
        type: "button",
        text: "BOOK NOW",
        onClick: handleBookNow,
      });
    }
  }, [cartItemsVendors]);

  const [btnAttributes, setbtnAttributes] = useState({
    type: "button",
    text: "BOOK NOW",
    onClick: handleBookNow,
  });

  const selectedService = services.find((service) => service.serviceID === serviceId);

  return (
    <>
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
          <CustomButton {...btnAttributes} />
        </div>
      </div>

      <ModalBase show={show} handleClose={handleClose} handleShow={handleShow} size="md">
        <Modal.Header closeButton>💥 Warning</Modal.Header>
        <Modal.Body>
          <p className="mb-0 text-center font-weight-bold">You can not add multiple vendors for the same service</p>
        </Modal.Body>
      </ModalBase>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartItemsVendors: selectCartItemsVendors,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(setItemToCart(item)),
  removeItemFromCart: (serviceID) => dispatch(removeFromCart(serviceID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorTile);
