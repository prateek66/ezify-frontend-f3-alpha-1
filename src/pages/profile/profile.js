import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createStructuredSelector } from "reselect";
import { State, City } from "country-state-city";

import "./profile.scss";

import Avatar1 from "./../../assets/profile/avatar-1.svg";
import CustomButton from "../../components/atmoic/customButton/customButton";
import { connect } from "react-redux";
import { selectUserDetails } from "../../redux/user/user.selectors";
import FormControl from "../../components/atmoic/formControl/formControl";

const Profile = ({ userDetails }) => {
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => setUpdate(true);
  const handleSave = () => setUpdate(false);
  const handleDiscard = () => setUpdate(false);

  const stateOptions = State.getStatesOfCountry("IN").map((state) => {
    return { value: state.isoCode, label: state.name };
  });

  const selectedStateCode = stateOptions.find((option) => option.label === userDetails.state).value;

  let cityOptions = City.getCitiesOfState("IN", selectedStateCode).map((city) => {
    return { value: city.name, label: city.name };
  });

  const formik = useFormik({
    initialValues: {
      firstName: userDetails.firstName,
      lastname: userDetails.lastname,
      mobile_number: userDetails.mobile_number,
      state: userDetails.state,
      stateCode: selectedStateCode,
      city: userDetails.city,
      address: userDetails.address,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(3).max(15, "Must be 15 characters or less").required("Required"),
      lastname: Yup.string().min(3).max(20, "Must be 20 characters or less").required("Required"),
      mobile_number: Yup.string("Invalid mobile number")
        .min(10, "Must be a valid 10 digit number")
        .max(10, "Must be a valid 10 digit number")
        .required("Required"),
      state: Yup.string("Invalid state").required("Required"),
      stateCode: Yup.string("Invalid state").required("Required"),
      city: Yup.string("Invalid city").required("Required"),
      address: Yup.string("Invalid address").min(10).max(200).required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  const updateButtonAttributes = {
    type: "button",
    text: "Update Profile",
    classes: "font-weight-bold",
    onClick: handleUpdate,
  };

  const saveButtonAttributes = {
    type: "submit",
    text: "Save Changes",
    classes: "font-weight-bold mr-3",
  };

  const discardButtonAttributes = {
    type: "button",
    text: "Discard Changes",
    classes: "font-weight-bold red-btn",
    onClick: handleDiscard,
  };

  const fNameAttributes = {
    id: "firstName",
    label: "first Name",
    isMandatory: true,
    type: "input-formik",
    formik,
  };

  const lNameAttributes = {
    id: "lastname",
    label: "Last Name",
    isMandatory: true,
    type: "input-formik",
    formik,
  };

  const MobileNoAttributes = {
    id: "mobile_number",
    label: "Mobile",
    isMandatory: true,
    type: "input-formik",
    formik,
  };

  const [cityAttributes, setCityAttributes] = useState({
    id: "city",
    label: "City",
    isMandatory: true,
    type: "select-formik",
    options: cityOptions,
    defaultValue: cityOptions.find((option) => option.label === userDetails.city),
    formik,
  });

  const stateAttributes = {
    id: "state",
    label: "State",
    isMandatory: true,
    type: "select-formik",
    options: stateOptions,
    defaultValue: stateOptions.find((option) => option.label === userDetails.state),
    onChange: (value) => {
      formik.setFieldValue("state", value.label);
      formik.setFieldValue("stateCode", value.value);

      cityOptions = City.getCitiesOfState("IN", value.value).map((city) => {
        return { value: city.name, label: city.name };
      });

      formik.setFieldValue("city", cityOptions[0].value);

      setCityAttributes({
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
    formik,
  };

  const addressAttributes = {
    id: "address",
    label: "Address",
    isMandatory: true,
    type: "textarea-formik",
    formik,
  };

  return (
    <div className="container profilePage">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-12">
            <h2 className="profilePage__title">Your Profile</h2>
          </div>

          <div className="col-12 px-5 pl-lg-3 profilePage__box">
            <div className="row">
              <div className="col-lg-3 mb-5 mb-lg-0 d-flex align-items-start justify-content-center">
                <div className="profilePage__image">
                  <img src={Avatar1} alt="Profile" />
                </div>
              </div>
              <div className="col-lg-9">
                <div className="row border-bottom pb-3">
                  <div className="col-md-6">
                    {!update && (
                      <>
                        <label htmlFor="firstName" className="profilePage__box--label">
                          First Name
                        </label>
                        <div className="profilePage__box--value">{userDetails.firstName}</div>
                      </>
                    )}

                    {update && <FormControl {...fNameAttributes} />}
                  </div>
                  <div className="col-md-6 mt-4 mt-md-0">
                    {!update && (
                      <>
                        <label htmlFor="firstName" className="profilePage__box--label">
                          Last Name
                        </label>
                        <div className="profilePage__box--value">{userDetails.lastname}</div>
                      </>
                    )}

                    {update && <FormControl {...lNameAttributes} />}
                  </div>
                </div>

                <div className="row border-bottom pb-3 mt-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="profilePage__box--label">
                      Email
                    </label>
                    <div className="profilePage__box--value">{userDetails.email}</div>
                  </div>
                  <div className="col-md-6 mt-4 mt-md-0">
                    {!update && (
                      <>
                        <label htmlFor="firstName" className="profilePage__box--label">
                          Mobile Number
                        </label>
                        <div className="profilePage__box--value">{userDetails.mobile_number}</div>
                      </>
                    )}

                    {update && <FormControl {...MobileNoAttributes} />}
                  </div>
                </div>

                <div className="row border-bottom pb-3 mt-3">
                  <div className="col-md-6">
                    {!update && (
                      <>
                        <label htmlFor="firstName" className="profilePage__box--label">
                          State
                        </label>
                        <div className="profilePage__box--value">{userDetails.state}</div>
                      </>
                    )}

                    {update && <FormControl {...stateAttributes} />}
                  </div>
                  <div className="col-md-6 mt-4 mt-md-0">
                    {!update && (
                      <>
                        <label htmlFor="firstName" className="profilePage__box--label">
                          City
                        </label>
                        <div className="profilePage__box--value">{userDetails.city}</div>
                      </>
                    )}

                    {update && <FormControl {...cityAttributes} />}
                  </div>
                </div>

                <div className="row pb-3 mt-3">
                  <div className="col-12">
                    {!update && (
                      <>
                        <label htmlFor="firstName" className="profilePage__box--label">
                          Address
                        </label>
                        <div className="profilePage__box--value">{userDetails.address}</div>
                      </>
                    )}

                    {update && <FormControl {...addressAttributes} />}
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12 d-flex align-items-center justify-content-end">
                    {!update && <CustomButton {...updateButtonAttributes} />}
                    {update && <CustomButton {...saveButtonAttributes} />}
                    {update && <CustomButton {...discardButtonAttributes} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userDetails: selectUserDetails,
});

export default connect(mapStateToProps, null)(Profile);
