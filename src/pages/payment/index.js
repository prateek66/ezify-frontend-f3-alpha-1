import React, { useContext, useEffect, useState } from "react";
import "./payment.scss";

import CustomButton from "../../components/atmoic/customButton/customButton";

import ratingStar from "./../../assets/service_page/star.svg";
import rupee from "./../../assets/service_page/rupee.svg";
import { createStructuredSelector } from "reselect";
import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";
import { connect } from "react-redux";
import { disableFromCart, removeFromCart } from "../../redux/cart/cart.actions";
import { selectToken, selectUserDetails } from "../../redux/user/user.selectors";
import { ApiCallsContext } from "../../services/api.service";
import { catchHandler } from "../../utlis/catchHandler.utlis";
import { API_URLS } from "../../utlis/constants";
import { setToasterConfig } from "../../redux/toaster/toaster.actions";
import { withRouter } from "react-router-dom";

const Payment = ({ cartItems, totalAmount, disabledItemFromCart, userToken, userDetails, setToasterCofig, history }) => {
  const ApiContext = useContext(ApiCallsContext);

  const handlePaymentSubmit = async () => {
    if (userToken) {
      const response = await catchHandler(paymentSubmitAPI);
      console.log(response);
      if (response) {
        setToasterCofig({
          show: true,
          message: "Payment done successfully",
          className: "success",
        });

        setTimeout(() => {
          history.push("/bookings");
        }, 3000);
      }
    }
  };

  const paymentSubmitAPI = async () => {
    let postObj = {
      total_amount: totalAmount,
      bookings: [],
    };

    cartItems.forEach((item) => {
      postObj.bookings.push({
        serviceID: item.serviceID,
        vendorID: item.vendorID,
        basePrice: item.basePrice,
      });
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
    onClick: handlePaymentSubmit,
  });

  useEffect(() => {
    if (totalAmount <= 0) {
      setbtnAttributes({
        type: "submit",
        text: "PAY NOW",
        classes: "cp-3 btn-block",
        disabled: true,
        onClick: handlePaymentSubmit,
      });
    } else {
      setbtnAttributes({
        type: "submit",
        text: "PAY NOW",
        classes: "cp-3 btn-block",
        disabled: false,
        onClick: handlePaymentSubmit,
      });
    }
  }, [totalAmount]);

  return (
    <div className="payment-page px-3 px-lg-0">
      <div className="container">
        <div className="row py-4">
          <div className="col-9 mx-auto payment-page__heading-text py-2">PAYMENT</div>
          <div className="col-lg-9 col-md-11 payment-page__custom-container mx-auto">
            <div className="payment-page__custom-container-1 customScroll">
              {cartItems.map((item, index) => (
                <div className="row payment-page__vendorTile mb-2 mr-2" key={index}>
                  <div className={`col-2 d-flex align-items-center justify-content-center ${item.active ? null : "custom-blur"}`}>
                    <img src={item.profileImage} alt="Vendor Profile" className="h-100 w-100 rounded-circle" />
                  </div>
                  <div className={`col-4 ${item.active ? null : "custom-blur"}`}>
                    <div className="mb-2 d-flex align-items-center justify-content-start payment-page__vendorTile__icons">{item.serviceName}</div>
                    <div className="d-flex align-items-center justify-content-between payment-page__vendorTile__nameRatings">
                      <div className="payment-page__vendorTile__name">
                        {item.firstName} {item.lastName}
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start payment-page__vendorTile__ratings">
                      <img src={ratingStar} alt="Rating" />
                      <span>4.5</span>
                    </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Payment));
