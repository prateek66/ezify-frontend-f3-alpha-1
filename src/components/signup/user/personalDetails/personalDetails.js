import React from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../../../atmoic/customButton/customButton";
import FormControl from "../../../atmoic/formControl/formControl";
import "./personalDetails.scss";

const PersonalDetails = ({ values, handleChange, nextStep }) => {
  const proceed = (e) => {
    e.preventDefault();
    nextStep();
  };

  const fNameFormControlAttributes = {
    id: "fname",
    label: "First Name",
    isMandatory: true,
    type: "input",
  };

  const lNameFormControlAttributes = {
    id: "lname",
    label: "Last Name",
    isMandatory: true,
    type: "input",
  };

  const stateFormControlAttributes = {
    id: "state",
    label: "State",
    isMandatory: true,
    type: "input",
  };

  const cityFormControlAttributes = {
    id: "cityField",
    label: "City",
    isMandatory: true,
    type: "input",
  };

  const addressFormControlAttributes = {
    id: "address",
    label: "Address",
    isMandatory: true,
    type: "textarea",
  };

  const mobileFormControlAttributes = {
    id: "mobile",
    label: "Mobile Number",
    isMandatory: true,
    type: "input",
  };

  const buttonAttributes = {
    type: "submit",
    text: "Submit",
    classes: "font-weight-bold cp-2",
    onClick: proceed,
  };

  return (
    <div className="personalDetails">
      <Modal.Header closeButton>📃 USER PROFILE</Modal.Header>
      <Modal.Body>
        <div className="container">
          <p>
            Welcome to Ezzify! Please fill the <br /> details below to register.
          </p>

          <div className="row">
            <div className="col-6">
              <FormControl {...fNameFormControlAttributes} />
            </div>
            <div className="col-6">
              <FormControl {...lNameFormControlAttributes} />
            </div>
            <div className="col-6">
              <FormControl {...stateFormControlAttributes} />
            </div>
            <div className="col-6">
              <FormControl {...cityFormControlAttributes} />
            </div>
            <div className="col-12">
              <FormControl {...addressFormControlAttributes} />
            </div>
            <div className="col-6">
              <FormControl {...mobileFormControlAttributes} />
            </div>
            <div className="col-12 text-right">
              <CustomButton {...buttonAttributes} />
            </div>
          </div>
        </div>
      </Modal.Body>
    </div>
  );
};

export default PersonalDetails;
