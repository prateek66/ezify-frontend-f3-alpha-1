import React from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../../../atmoic/customButton/customButton";
import FormControl from "../../../atmoic/formControl/formControl";

const EmailPopup = ({ values, handleChange, nextStep }) => {
  const proceed = (e) => {
    e.preventDefault();
    nextStep();
  };

  const emailFormControlAttributes = {
    id: "email",
    label: "Enter Your Email Address",
    isMandatory: true,
    type: "email",
    onChange: handleChange("email"),
    // validators: {
    //   required: true,
    // },
  };

  const buttonAttributes = {
    type: "submit",
    text: "SEND OTP",
    classes: "btn-block font-weight-bold",
    onClick: proceed,
  };

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
