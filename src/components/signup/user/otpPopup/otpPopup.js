import React from "react";
import { Modal } from "react-bootstrap";

import CustomButton from "../../../atmoic/customButton/customButton";
import FormControl from "../../../atmoic/formControl/formControl";

import "./otpPopup.scss";

const OtpPopup = ({ values, handleChange, nextStep, prevStep }) => {
  const proceed = (e) => {
    e.preventDefault();
    nextStep();
  };

  const emailFormControlAttributes = {
    id: "email",
    label: "Enter Your Email Address",
    isMandatory: true,
    type: "email",
    disabled: true,
  };

  const buttonAttributes = {
    type: "submit",
    text: "NEXT",
    classes: "btn-block font-weight-bold",
    onClick: proceed,
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
          <input className="form-control formControl-input mb-3 otp-input" id="otp" />
          <p className="emailPopup__change-email">
            <span>Resend OTP</span>
          </p>
          <CustomButton {...buttonAttributes} />
        </form>
      </Modal.Body>
    </div>
  );
};

export default OtpPopup;
