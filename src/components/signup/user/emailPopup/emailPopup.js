import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import { ApiCallsContext } from "../../../../services/api.service";
import { catchHandler } from "../../../../utlis/catchHandler.utlis";
import { API_URLS } from "../../../../utlis/constants";
import CustomButton from "../../../atmoic/customButton/customButton";
import FormControl from "../../../atmoic/formControl/formControl";

const EmailPopup = ({ values, updateState, handleChange, nextStep }) => {
  const sendOTPAPI = async () => {
    const postObj = {
      email: values.email,
    };

    const data = await ApiContext.postData(API_URLS.SEND_OTP, postObj);
    return data;
  };

  const sendOTP = async () => {
    if (values.email) {
      const response = await catchHandler(sendOTPAPI);
      console.log("otpVerify", response.otpVerify);
      updateState("id", response._id);
      nextStep();
    }
  };

  const [buttonAttributes, setButtonAttributes] = useState({
    type: "submit",
    text: "SEND OTP",
    classes: "btn-block font-weight-bold",
    disabled: true,
    onClick: sendOTP,
  });

  const ApiContext = useContext(ApiCallsContext);

  const emailFormControlAttributes = {
    id: "email",
    label: "Enter Your Email Address",
    isMandatory: true,
    type: "email",
    onChange: handleChange("email"),
    validators: {
      required: true,
    },
    value: values.email,
  };

  useEffect(() => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    if (values.email.match(emailRegex) && values.email) {
      setButtonAttributes({
        type: "submit",
        text: "SEND OTP",
        classes: "btn-block font-weight-bold",
        disabled: false,
        onClick: sendOTP,
      });
    } else {
      setButtonAttributes({
        type: "submit",
        text: "SEND OTP",
        classes: "btn-block font-weight-bold",
        disabled: true,
        onClick: sendOTP,
      });
    }
  }, [values.email]);

  return (
    <div className="emailPopup">
      <Modal.Header closeButton>Login / Signup</Modal.Header>
      <Modal.Body>
        <FormControl {...emailFormControlAttributes} />
        <p className="emailPopup__text">
          By signing up, you accept our <span>Terms of use</span> and <span>Privacy Policy</span>
        </p>
        <CustomButton {...buttonAttributes} />
      </Modal.Body>
    </div>
  );
};

export default EmailPopup;
