import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { setCurrentUser } from "../../../../redux/user/user.actions";
import { ApiCallsContext } from "../../../../services/api.service";
import { catchHandler } from "../../../../utlis/catchHandler.utlis";
import { API_URLS } from "../../../../utlis/constants";
import CustomButton from "../../../atmoic/customButton/customButton";
import FormControl from "../../../atmoic/formControl/formControl";
import "./personalDetails.scss";

const PersonalDetails = ({ values, handleChange, nextStep, setToken }) => {
  const ApiContext = useContext(ApiCallsContext);

  const fNameFormControlAttributes = {
    id: "fname",
    label: "First Name",
    isMandatory: true,
    type: "input",
    onChange: handleChange("firstName"),
  };

  const lNameFormControlAttributes = {
    id: "lname",
    label: "Last Name",
    isMandatory: true,
    type: "input",
    onChange: handleChange("lastName"),
  };

  const stateFormControlAttributes = {
    id: "state",
    label: "State",
    isMandatory: true,
    type: "input",
    onChange: handleChange("state"),
  };

  const cityFormControlAttributes = {
    id: "cityField",
    label: "City",
    isMandatory: true,
    type: "input",
    onChange: handleChange("city"),
  };

  const addressFormControlAttributes = {
    id: "address",
    label: "Address",
    isMandatory: true,
    type: "textarea",
    onChange: handleChange("address"),
  };

  const mobileFormControlAttributes = {
    id: "mobile",
    label: "Mobile Number",
    isMandatory: true,
    type: "input",
    onChange: handleChange("mobileNumber"),
  };

  const userRegistrationAPI = async () => {
    const { email, otp, firstName, lastName, state, city, address, mobileNumber } = values;
    const postObj = {
      email,
      otp,
      firstName,
      lastname: lastName,
      state,
      city,
      address,
      mobile_number: mobileNumber,
      is_emaiVerified: true,
      isActive: true,
    };

    const headers = {
      Authorization: `Bearer ${values.token}`,
    };

    const data = await ApiContext.patchData(API_URLS.UPDATE_USER, postObj, { headers });
    return data;
  };

  const handleUserRegistration = async () => {
    await catchHandler(userRegistrationAPI);
    setToken(values.token);
    nextStep();
  };

  const buttonAttributes = {
    type: "submit",
    text: "Submit",
    classes: "font-weight-bold cp-2",
    onClick: handleUserRegistration,
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
            <div className="col-md-6">
              <FormControl {...fNameFormControlAttributes} />
            </div>
            <div className="col-md-6">
              <FormControl {...lNameFormControlAttributes} />
            </div>
            <div className="col-md-6">
              <FormControl {...stateFormControlAttributes} />
            </div>
            <div className="col-md-6">
              <FormControl {...cityFormControlAttributes} />
            </div>
            <div className="col-12">
              <FormControl {...addressFormControlAttributes} />
            </div>
            <div className="col-md-6">
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

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(setCurrentUser(token)),
});

export default connect(null, mapDispatchToProps)(PersonalDetails);
