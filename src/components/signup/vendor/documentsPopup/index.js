import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import CustomButton from "../../../atmoic/customButton/customButton";

import "./documentsPopup.scss";

import documentIcon from "./../../../../assets/signup/document.svg";
import checkedIcon from "./../../../../assets/signup/checked.svg";
import chevronDownIcon from "./../../../../assets/signup/chevron-down.svg";

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
        <div className="container">
          <p>
            Provide us the required documents and details to <br /> set up your account.
          </p>

          <div className="row mb-4">
            <div className="col-6 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img src={documentIcon} alt="Document Icon" className="mr-3" />
                <div>Profile Photo</div>
                <img src={checkedIcon} alt="Checked Icon" className="ml-3" />
              </div>
              <img src={chevronDownIcon} alt="chevronDownIcon" />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-6 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img src={documentIcon} alt="Document Icon" className="mr-3" />
                <div>Aadhar Card</div>
                <img src={checkedIcon} alt="Checked Icon" className="ml-3" />
              </div>
              <img src={chevronDownIcon} alt="chevronDownIcon" />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-6 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img src={documentIcon} alt="Document Icon" className="mr-3" />
                <div>Pan Card</div>
                <img src={checkedIcon} alt="Checked Icon" className="ml-3" />
              </div>
              <img src={chevronDownIcon} alt="chevronDownIcon" />
            </div>
          </div>

          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-between">
              <CustomButton {...backBtnAttributes} />
              <CustomButton {...nextBtnAttributes} />
            </div>
          </div>
        </div>
      </Modal.Body>
    </div>
  );
};

export default DocumentsPopup;
