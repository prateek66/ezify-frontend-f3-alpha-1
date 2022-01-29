import React from "react";
import { Modal } from "react-bootstrap";

import CustomButton from "../customButton/customButton";

import "./confirmationPopup.scss";

const ConfirmationPopup = ({ message, handleClose, handleYes }) => {
  const yesBtnAttribute = {
    type: "button",
    text: "Yes",
    classes: "font-weight-bold ml-3",
    onClick: handleYes,
  };

  const noBtnAttribute = {
    type: "button",
    text: "No",
    classes: "font-weight-bold customButton-ghost",
    onClick: handleClose,
  };

  return (
    <>
      <Modal.Header closeButton className="pb-0"></Modal.Header>
      <Modal.Body>
        <p className="font-weight-bold">{message}</p>

        <div className="d-flex align-items-center justify-content-end">
          <CustomButton {...noBtnAttribute} />
          <CustomButton {...yesBtnAttribute} />
        </div>
      </Modal.Body>
    </>
  );
};

export default ConfirmationPopup;
