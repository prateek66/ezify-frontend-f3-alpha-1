import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { State, City } from "country-state-city";

import { setCurrentUser, setCurrentUserToken } from "../../../../redux/user/user.actions";
import { ApiCallsContext } from "../../../../services/api.service";
import { catchHandler } from "../../../../utlis/catchHandler.utlis";
import { API_URLS } from "../../../../utlis/constants";
import CustomButton from "../../../atmoic/customButton/customButton";
import FormControl from "../../../atmoic/formControl/formControl";

import "./personalDetails.scss";

const PersonalDetails = ({ values, handleChange, nextStep, setToken, updateState, setUser }) => {
  const ApiContext = useContext(ApiCallsContext);

  const stateOptions = State.getStatesOfCountry("IN").map((state) => {
    return { value: state.isoCode, label: state.name };
  });

  const [citiesConfig, setCitiesConfig] = useState({
    id: "cityField",
    label: "City",
    isMandatory: true,
    type: "select",
    onChange: (e) => updateState("city", e.value),
    options: [],
    bindValue: "name",
    bindLabel: "name",
  });

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
    type: "select",
    onChange: (e) => {
      console.log(e);
      updateState("state", e.label);
      updateState("stateCode", e.value);
    },
    options: stateOptions,
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
      lastName,
      state,
      city,
      address,
      mobileNumber: +mobileNumber,
      isEmaiVerified: true,
      isActive: true,
    };

    const headers = {
      Authorization: `Bearer ${values.token}`,
    };

    const data = await ApiContext.patchData(API_URLS.UPDATE_USER, postObj, { headers });
    return data;
  };

  const handleUserRegistration = async () => {
    const response = await catchHandler(userRegistrationAPI);
    setToken(values.token);
    setUser(response);
    nextStep();
  };

  const buttonAttributes = {
    type: "submit",
    text: "Submit",
    classes: "font-weight-bold cp-2",
    onClick: handleUserRegistration,
  };

  useEffect(() => {
    let citiesOptions = City.getCitiesOfState("IN", values.stateCode).map((city) => {
      return { value: city.name, label: city.name };
    });

    console.log(citiesOptions);

    setCitiesConfig({
      id: "cityField",
      label: "City",
      isMandatory: true,
      type: "select",
      onChange: (e) => updateState("city", e.value),
      options: citiesOptions,
      bindValue: "name",
      bindLabel: "name",
    });
  }, [values.stateCode]);

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
              <FormControl {...citiesConfig} />
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
  setToken: (token) => dispatch(setCurrentUserToken(token)),
  setUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(PersonalDetails);
