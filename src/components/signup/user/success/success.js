import React from "react";
import { Modal } from "react-bootstrap";

import "./success.scss";

import mailSent from "./../../../../assets/signup/mail_sent.webp";

const Success = ({ type }) => {
  return (
    <div>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center justify-content-center success-msg">
          <img src={mailSent} alt="Email Sent" />
          <h2>Thank You</h2>
          {type === "user" && <p>You are successfully registered</p>}
          {type === "vendor" && (
            <p>
              Your application was successfully <br /> submitted and is <span>Under Verification</span>
            </p>
          )}
        </div>
      </Modal.Body>
    </div>
  );
};

export default Success;
