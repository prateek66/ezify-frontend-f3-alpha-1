import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { State, City } from "country-state-city";
import * as Yup from "yup";
import { useFormik } from "formik";

import { setCurrentUser, setCurrentUserToken } from "../../../../redux/user/user.actions";
import { ApiCallsContext } from "../../../../services/api.service";
import { catchHandler } from "../../../../utlis/catchHandler.utlis";
import { API_URLS } from "../../../../utlis/constants";
import CustomButton from "../../../atmoic/customButton/customButton";
import FormControl from "../../../atmoic/formControl/formControl";

import "./personalDetails.scss";

const PersonalDetails = ({ values, handleChange, nextStep, setToken, updateState, setUser, usertype }) => {
  const ApiContext = useContext(ApiCallsContext);

  const stateOptions = State.getStatesOfCountry("IN").map((state) => {
    return { value: state.isoCode, label: state.name };
  });

  const selectedStateCode = stateOptions.find((option) => option.label === values.state)?.value;

  const formik = useFormik({
    initialValues: {
      firstName: values.firstName,
      lastName: values.lastName,
      state: values.state,
      stateCode: selectedStateCode,
      city: values.city,
      address: values.address,
      mobileNumber: values.mobileNumber,
      roles: usertype,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(3).max(15, "Must be 15 characters or less").required("Required"),
      lastName: Yup.string().min(3).max(20, "Must be 20 characters or less").required("Required"),
      state: Yup.string("Invalid state").required("Required"),
      stateCode: Yup.string("Invalid state").required("Required"),
      city: Yup.string("Invalid city").required("Required"),
      address: Yup.mixed().when("roles", {
        is: "user",
        then: Yup.string("Invalid address").min(10).max(200).required("Required"),
        otherwise: Yup.mixed().nullable(),
      }),
      mobileNumber: Yup.string("Invalid mobile number")
        .min(10, "Must be a valid 10 digit number")
        .max(10, "Must be a valid 10 digit number")
        .required("Required"),
      roles: Yup.string().required(),
    }),
    onSubmit: (values) => {
      const { firstName, lastName, state, stateCode, city, address, mobileNumber } = formik.values;

      updateState("firstName", firstName);
      updateState("lastName", lastName);
      updateState("state", state);
      updateState("stateCode", stateCode);
      updateState("city", city);
      updateState("address", address);
      updateState("mobileNumber", mobileNumber);

      if (usertype === "user") {
        handleUserRegistration();
        return;
      }

      nextStep();
    },
  });

  let cityOptions = City.getCitiesOfState("IN", selectedStateCode).map((city) => {
    return { value: city.name, label: city.name };
  });

  const [citiesConfig, setCitiesConfig] = useState({
    id: "city",
    label: "City",
    isMandatory: true,
    type: "select-formik",
    options: cityOptions,
    defaultValue: cityOptions.find((option) => option.label === values.city),
    onChange: (cityValue) => {
      formik.setFieldValue("city", cityValue.value);
    },
    formik,
  });

  const fNameFormControlAttributes = {
    id: "firstName",
    label: "first Name",
    isMandatory: true,
    type: "input-formik",
    formik,
  };

  const lNameFormControlAttributes = {
    id: "lastName",
    label: "Last Name",
    isMandatory: true,
    type: "input-formik",
    formik,
  };

  const stateFormControlAttributes = {
    id: "state",
    label: "State",
    isMandatory: true,
    type: "select-formik",
    options: stateOptions,
    formik,
    defaultValue: stateOptions.find((option) => option.label === values.state),
    onChange: (value) => {
      formik.setFieldValue("state", value.label);
      formik.setFieldValue("stateCode", value.value);

      cityOptions = City.getCitiesOfState("IN", value.value).map((city) => {
        return { value: city.name, label: city.name };
      });

      setCitiesConfig({
        id: "city",
        label: "City",
        isMandatory: true,
        type: "select-formik",
        options: cityOptions,
        defaultValue: cityOptions[0],
        onChange: (cityValue) => {
          formik.setFieldValue("city", cityValue.value);
        },
        formik,
      });
    },
  };

  const addressFormControlAttributes = {
    id: "address",
    label: "Address",
    isMandatory: true,
    type: "textarea-formik",
    formik,
  };

  const mobileFormControlAttributes = {
    id: "mobileNumber",
    label: "Mobile",
    isMandatory: true,
    type: "input-formik",
    formik,
  };

  const userRegistrationAPI = async () => {
    const { email, firstName, lastName, state, city, address, mobileNumber } = formik.values;
    const postObj = {
      email,
      firstName,
      lastName,
      state,
      city,
      address,
      mobileNumber: +mobileNumber,
      isEmailVerified: true,
      isActive: true,
      isApproved: "approved",
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

  const [btnAttribute, setBtnAttribute] = useState({
    type: "submit",
    text: usertype === "user" ? "Submit" : "Next",
    classes: "font-weight-bold cp-2",
    disabled: !formik.isValid,
  });

  useEffect(() => {
    setBtnAttribute({
      type: "submit",
      text: usertype === "user" ? "Submit" : "Next",
      classes: "font-weight-bold cp-2",
      disabled: !formik.isValid,
    });
  }, [formik.isValid]);

  useEffect(() => {
    formik.validateForm();
  }, []);

  return (
    <div className="personalDetails">
      <Modal.Header closeButton>📃 {usertype === "user" ? "USER" : "VENDOR"} PROFILE</Modal.Header>
      <Modal.Body>
        <div className="container">
          <p>
            Welcome to Ezzify! Please fill the <br /> details below to register.
          </p>

          <form onSubmit={formik.handleSubmit}>
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
              {usertype === "user" && (
                <div className="col-12">
                  <FormControl {...addressFormControlAttributes} />
                </div>
              )}
              <div className="col-md-6">
                <FormControl {...mobileFormControlAttributes} />
              </div>
              <div className="col-12 text-right">
                <CustomButton {...btnAttribute} />
              </div>
            </div>
          </form>
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
