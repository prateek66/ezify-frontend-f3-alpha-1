import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../../../atmoic/customButton/customButton";
import "./documentsPopup.scss";

const DocumentsPopup = ({ prevStep }) => {
  const [nextBtnAttributes, setNextBtnAttributes] = useState({
    type: "submit",
    text: "NEXT",
    classes: "font-weight-bold cp-2",
  });

  const backBtnAttributes = {
    type: "button",
    text: "BACK",
    classes: "font-weight-bold cp-2",
    onClick: prevStep,
  };

  return (
    <div className="documentsPopup">
      <Modal.Header closeButton>📃 VENDOR PROFILE</Modal.Header>
      <Modal.Body>
        <p>
          Provide us the required documents and details to <br /> set up your account.
        </p>

        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-between">
            <CustomButton {...backBtnAttributes} />
            <CustomButton {...nextBtnAttributes} />
          </div>
        </div>
      </Modal.Body>
    </div>
  );
};

export default DocumentsPopup;
