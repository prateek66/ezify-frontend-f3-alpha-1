import React, { useContext, useEffect, useState } from "react";
import "./payment.scss";

import CustomButton from "../../components/atmoic/customButton/customButton";

import rupee from "./../../assets/service_page/rupee.webp";
import { createStructuredSelector } from "reselect";
import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";
import { connect } from "react-redux";
import { disableFromCart, emptyCart, removeFromCart } from "../../redux/cart/cart.actions";
import { selectToken, selectUserDetails } from "../../redux/user/user.selectors";
import { ApiCallsContext } from "../../services/api.service";
import { catchHandler } from "../../utlis/catchHandler.utlis";
import { API_URLS } from "../../utlis/constants";
import { setToasterConfig } from "../../redux/toaster/toaster.actions";
import { withRouter } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ModalBase from "../../components/atmoic/modal/modal";

const Payment = ({ cartItems, totalAmount, disabledItemFromCart, userToken, setCartEmpty, history }) => {
  const ApiContext = useContext(ApiCallsContext);

  const [show, setShow] = useState(false);
  const [callAPI, setCallAPI] = useState(false);
  const [message, setMessage] = useState(null);

  const handleClose = () => {
    if (message.message === "Payment Successfully Done") {
      history.push("/bookings");
    }
    setShow(false);
    setCallAPI(false);
  };
  const handleShow = () => setShow(true);

  const handlePaymentSubmit = async () => {
    const response = await catchHandler(paymentSubmitAPI);
    console.log(response);
    if (response) {
      setMessage({
        title: "",
        message: "Payment Successfully Done",
      });
      setShow(true);
      setCartEmpty();
    }

    console.log(userToken);
  };

  const paymentSubmitAPI = async () => {
    let postObj = {
      total_amount: totalAmount,
      bookings: [],
    };

    cartItems.forEach((item) => {
      if (item.active) {
        postObj.bookings.push({
          serviceID: item.serviceID,
          vendorID: item.vendorID,
          baseprice: item.basePrice,
        });
      }
    });

    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    console.log(postObj);

    const data = await ApiContext.postData(API_URLS.CREATE_PAYMENT, postObj, { headers });
    return data;
  };

  const [btnAttributes, setbtnAttributes] = useState({
    type: "submit",
    text: "PAY NOW",
    classes: "cp-3 btn-block",
    onClick: () => setCallAPI(true),
  });

  useEffect(() => {
    if (totalAmount <= 0) {
      setbtnAttributes({
        type: "submit",
        text: "PAY NOW",
        classes: "cp-3 btn-block",
        disabled: true,
        onClick: () => setCallAPI(true),
      });
    } else {
      setbtnAttributes({
        type: "submit",
        text: "PAY NOW",
        classes: "cp-3 btn-block",
        disabled: false,
        onClick: () => setCallAPI(true),
      });
    }
  }, [totalAmount]);

  useEffect(() => {
    if (callAPI) {
      if (userToken) {
        handlePaymentSubmit();
      } else {
        setMessage({
          title: "💥 Warning",
          message: "Please Login",
        });
        setShow(true);
      }
    }
  }, [userToken, callAPI]);

  return (
    <>
      <div className="payment-page px-3 px-lg-0">
        <div className="container">
          <div className="row py-4">
            <div className="col-9 mx-auto payment-page__heading-text py-2">PAYMENT</div>
            <div className="col-lg-9 col-md-11 payment-page__custom-container mx-auto">
              <div className="payment-page__custom-container-1 customScroll">
                {cartItems.length > 0 &&
                  cartItems.map((item, index) => (
                    <div className="row payment-page__vendorTile mb-2 mr-2" key={index}>
                      <div className={`col-2 d-flex align-items-center justify-content-center payment-page__IMG ${item.active ? null : "custom-blur"}`}>
                        <img src={item.profileImage} alt="Vendor Profile" className="h-100 w-100 rounded-circle" />
                      </div>
                      <div className={`col-4 ${item.active ? null : "custom-blur"}`}>
                        <div className="mb-2 d-flex align-items-center justify-content-start payment-page__vendorTile__icons">{item.serviceName}</div>
                        <div className="d-flex align-items-center justify-content-between payment-page__vendorTile__nameRatings">
                          <div className="payment-page__vendorTile__name">
                            {item.firstName} {item.lastName}
                          </div>
                        </div>
                        {/* <div className="d-flex align-items-center justify-content-start payment-page__vendorTile__ratings">
                          <img src={ratingStar} alt="Rating" />
                          <span>4.5</span>
                        </div> */}
                      </div>
                      <div className="col-3 offset-3 d-flex align-items-end justify-content-between flex-column">
                        <div className="">
                          <input
                            type="checkbox"
                            className="custom-toggle-btn"
                            checked={item.active}
                            onChange={() => disabledItemFromCart(item.serviceID)}
                          />
                        </div>
                        <div className="d-flex align-items-center justify-content-between payment-page__vendorTile__pricing">
                          <img src={rupee} alt="Rupee Symbol" />
                          <span className="ml-2">{item.basePrice}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                {cartItems.length === 0 && <h2 className="text-center">Your cart is empty</h2>}
              </div>

              <div className="col-12 d-flex align-items-end justify-content-between flex-column mb-3">
                <div className="payment-page__final-pricing">
                  <span className="">
                    <b>Total</b>
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between payment-page__vendorTile__pricing payment-page__final-pricing">
                  <img src={rupee} alt="Rupee Symbol" />
                  <span className="ml-2">{totalAmount}</span>
                </div>
              </div>
              <div className="col-12 d-flex align-items-center justify-content-center">
                <CustomButton {...btnAttributes} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalBase show={show} handleClose={handleClose} handleShow={handleShow} size="md">
        <Modal.Header closeButton>{message?.title} </Modal.Header>
        <Modal.Body>
          <p className="mb-0 text-center font-weight-bold">{message?.message}</p>
        </Modal.Body>
      </ModalBase>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  totalAmount: selectCartTotal,
  userDetails: selectUserDetails,
  userToken: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
  removeItemFromCart: (serviceID) => dispatch(removeFromCart(serviceID)),
  disabledItemFromCart: (serviceID) => dispatch(disableFromCart(serviceID)),
  setToasterCofig: (config) => dispatch(setToasterConfig(config)),
  setCartEmpty: () => dispatch(emptyCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Payment));
