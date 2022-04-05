import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";

import { ApiCallsContext } from "../../../../services/api.service";
import { catchHandler } from "../../../../utlis/catchHandler.utlis";
import { API_URLS } from "../../../../utlis/constants";
// import OtpPopup from "../otpPopup/otpPopup";
import CustomButton from "../../../atmoic/customButton/customButton";
import FormControl from "../../../atmoic/formControl/formControl";

const EmailPopup = ({ values, updateState, nextStep, type }) => {
  const ApiContext = useContext(ApiCallsContext);

  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

  const formik = useFormik({
    initialValues: {
      email: values.email,
    //  values: "pesto@pesto.com"
    },
    validationSchema: Yup.object({
      email: Yup.string().min(3).required("Required").matches(emailRegex, "Enter a valid email"),
    }),
    onSubmit: () => {
      sendOTP();
    },
  });

  const sendOTP = async () => {
    if (formik.isValid) {
      updateState("email", formik.values.email);
      const response = await catchHandler(sendOTPAPI);

      if (response.isApproved === "rejected") {
        formik.setFieldError("email", "Your profile was rejected. Please use different email.");
        return;
      }

      if (response.isApproved === "pending" && response.isActive) {
        formik.setFieldError("email", "Your profile is under verification. Please wait for sometime.");
        return;
      }
      updateState("otp",response.otpVerify);
      console.log("otpVerify", response.otpVerify);
      updateState("id", response._id);
      nextStep();
    }
  };

  const sendOTPAPI = async () => {
    const postObj = {
      email: formik.values.email,
      role: type,
    };

    const data = await ApiContext.postData(API_URLS.SEND_OTP, postObj);
    return data;
  };

  const [buttonAttributes, setButtonAttributes] = useState({
    type: "submit",
    text: "SEND OTP",
    classes: "btn-block font-weight-bold",
    disabled: false,
  });

  const emailAttributes = {
    id: "email",
    label: "ENTER YOUR EMAIL ADDRESS",
    isMandatory: true,
    type: "input-formik",
    //value: formik.initialValues.values,
    formik,
  };

  useEffect(() => {
    setButtonAttributes({
      type: "submit",
      text: "SEND OTP",
      classes: "btn-block font-weight-bold",
      disabled: !formik.isValid,
    });
  }, [formik.isValid]);

  useEffect(() => {
    formik.validateForm();
  
  }, []);

  console.log(emailAttributes.value, "qqqqqqqq");

  return (
    <div className="emailPopup">
      <Modal.Header closeButton>Login / Signup</Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormControl {...emailAttributes} />
          <p className="emailPopup__text">
            By signing up, you accept our <span>Terms of use</span> and <span>Privacy Policy</span>
          </p>
          <CustomButton {...buttonAttributes} />
        </form>
      </Modal.Body>
    </div>
  );
};

export default EmailPopup;
