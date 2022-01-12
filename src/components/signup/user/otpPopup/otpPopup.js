import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { setCurrentUser, setCurrentUserToken } from "../../../../redux/user/user.actions";

import { ApiCallsContext } from "../../../../services/api.service";
import { catchHandler } from "../../../../utlis/catchHandler.utlis";
import { API_URLS } from "../../../../utlis/constants";

import CustomButton from "../../../atmoic/customButton/customButton";
import FormControl from "../../../atmoic/formControl/formControl";

import "./otpPopup.scss";

const OtpPopup = ({ values, updateState, nextStep, prevStep, handleClose, setToken, setUser }) => {
  const ApiContext = useContext(ApiCallsContext);

  const emailFormControlAttributes = {
    id: "email",
    label: "Enter Your Email Address",
    isMandatory: true,
    type: "email",
    disabled: true,
    value: values.email,
  };

  const buttonAttributes = {
    type: "button",
    text: "NEXT",
    classes: "btn-block font-weight-bold",

    onClick: () => handleOTPChange(),
  };

  const sendOTPAPI = async () => {
    const postObj = {
      email: values.email,
    };

    const data = await ApiContext.postData(API_URLS.SEND_OTP, postObj);
    return data;
  };

  const verifyOTPAPI = async (otp) => {
    const postObj = {
      id: values.id,
      otp,
    };

    const data = await ApiContext.postData(API_URLS.VERIFY_OTP, postObj);
    return data;
  };

  const handleOTPChange = async (e) => {
    const { value } = e.target;

    if (value.length === 4) {
      const response = await catchHandler(() => verifyOTPAPI(value));

      updateState("token", response.token);
      if (!response.user.isActive) {
        nextStep();
      } else {
        setToken(response.token);
        setUser(response.user);
        handleClose();
      }
    }
  };

  return (
    <div className="emailPopup">
      <Modal.Header closeButton>Login / Signup</Modal.Header>
      <Modal.Body>
        <form>
          <FormControl {...emailFormControlAttributes} />
          <div className="d-flex justify-content-between align-items-center">
            <label className="formControl-label mb-0">Enter the OTP sent to your Email</label>
            <p className="emailPopup__change-email mb-0">
              <span onClick={prevStep}>Change Email</span>
            </p>
          </div>
          <input className="form-control formControl-input mb-3 otp-input" id="otp" maxLength={4} onChange={handleOTPChange} />
          <p className="emailPopup__change-email">
            <span onClick={sendOTPAPI}>Resend OTP</span>
          </p>
          {/* <CustomButton {...buttonAttributes} /> */}
        </form>
      </Modal.Body>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(setCurrentUserToken(token)),
  setUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(OtpPopup);
