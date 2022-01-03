import React from "react";
import { Modal } from "react-bootstrap";

import "./success.scss";

import mailSent from "./../../../../assets/signup/mail_sent.svg";

const Success = () => {
  return (
    <div>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center justify-content-center success-msg">
          <img src={mailSent} alt="Email Sent" />
          <h2>Thank You</h2>
          <p>You are successfully registered</p>
        </div>
      </Modal.Body>
    </div>
  );
};

export default Success;
