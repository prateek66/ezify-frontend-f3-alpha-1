import React from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../../../atmoic/customButton/customButton";
import FormControl from "../../../atmoic/formControl/formControl";

const EmailPopup = () => {
  const emailFormControlAttributes = {
    id: "email",
    label: "Enter Your Email Address",
    isMandatory: true,
    type: "email",
  };

  const buttonAttributes = {
    type: "button",
    text: "SEND OTP",
    classes: "btn-block font-weight-bold",
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
