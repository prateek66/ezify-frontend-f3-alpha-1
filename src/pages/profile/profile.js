import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createStructuredSelector } from "reselect";
import { State, City } from "country-state-city";

import "./profile.scss";

import editIcon from "./../../assets/profile/edit-icon.svg";

import CustomButton from "../../components/atmoic/customButton/customButton";
import { connect } from "react-redux";
import { selectToken, selectUserDetails } from "../../redux/user/user.selectors";
import FormControl from "../../components/atmoic/formControl/formControl";
import { catchHandler } from "../../utlis/catchHandler.utlis";
import { ApiCallsContext } from "../../services/api.service";
import { API_URLS } from "../../utlis/constants";
import { setCurrentUser } from "../../redux/user/user.actions";

const Profile = ({ userDetails, userToken, setUser }) => {
  const ApiContext = useContext(ApiCallsContext);

  const [update, setUpdate] = useState(false);
  const [preview, setPreview] = useState(userDetails.profileImage);

  const handleUpdate = () => setUpdate(true);
  const handleSave = () => setUpdate(false);
  const handleDiscard = () => {
    setPreview(userDetails.profileImage);
    setUpdate(false);
  };

  const stateOptions = State.getStatesOfCountry("IN").map((state) => {
    return { value: state.isoCode, label: state.name };
  });

  const selectedStateCode = stateOptions.find((option) => option.label === userDetails.state).value;

  let cityOptions = City.getCitiesOfState("IN", selectedStateCode).map((city) => {
    return { value: city.name, label: city.name };
  });

  const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "image/jpg"];

  const formik = useFormik({
    initialValues: {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      mobileNumber: userDetails.mobileNumber,
      state: userDetails.state,
      stateCode: selectedStateCode,
      city: userDetails.city,
      address: userDetails.address,
      profileImage: userDetails.profileImage,
      profileImageFile: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(3).max(15, "Must be 15 characters or less").required("Required"),
      lastName: Yup.string().min(3).max(20, "Must be 20 characters or less").required("Required"),
      mobileNumber: Yup.string("Invalid mobile number")
        .min(10, "Must be a valid 10 digit number")
        .max(10, "Must be a valid 10 digit number")
        .required("Required"),
      state: Yup.string("Invalid state").required("Required"),
      stateCode: Yup.string("Invalid state").required("Required"),
      city: Yup.string("Invalid city").required("Required"),
      address: Yup.string("Invalid address").min(10).max(200).required("Required"),
      profileImageFile: Yup.mixed()
        .nullable()
        .test("FILE_SIZE", "File should be less than 3mb", (value) => !value || (value && value.size > 1024 * 3))
        .test("FILE_FORMAT", "File should be in png/jpg/jpeg format", (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))),
    }),
    onSubmit: (values) => {
      console.log(values);
      if (formik.isValid) {
        handleProfileUpdate();
      }
    },
  });

  const handleProfileUpdate = async () => {
    const response = await catchHandler(profileUpdateAPI);
    setUser(response);
    handleSave();
  };

  const profileUpdateAPI = async () => {
    const { firstName, lastName, mobileNumber, state, city, address, profileImageFile } = formik.values;

    let formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("mobileNumber", mobileNumber);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("address", address);
    formData.append("file", profileImageFile);

    const headers = {
      Authorization: `Bearer ${userToken}`,
      "content-type": "multipart/form-data",
    };

    const data = await ApiContext.patchData(API_URLS.UPDATE_USER, formData, { headers });
    return data;
  };

  const updateButtonAttributes = {
    type: "button",
    text: "Update Profile",
    classes: "font-weight-bold",
    onClick: handleUpdate,
  };

  const [saveButtonAttributes, setSaveButtonAttributes] = useState({
    type: "submit",
    text: "Save Changes",
    classes: "font-weight-bold mr-3",
    disabled: !formik.isValid,
  });

  useEffect(() => {
    setSaveButtonAttributes({
      type: "submit",
      text: "Save Changes",
      classes: "font-weight-bold mr-3",
      disabled: !formik.isValid,
    });
  }, [formik.isValid]);

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
    id: "lastName",
    label: "Last Name",
    isMandatory: true,
    type: "input-formik",
    formik,
  };

  const MobileNoAttributes = {
    id: "mobileNumber",
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
    onChange: (cityValue) => {
      console.log(cityValue);
      formik.setFieldValue("city", cityValue.value);
    },
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
          console.log(cityValue);
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

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
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
                  {!update && <img src={userDetails.profileImage} alt="Profile" className="profilePage__image--img" />}
                  {update && <img src={preview} alt="Profile" className="profilePage__image--img" />}
                  {update && (
                    <img
                      src={editIcon}
                      alt="Edit"
                      className="profilePage__image--edit"
                      onClick={() => document.getElementById("profileImageFile").click()}
                    />
                  )}
                  {update && (
                    <>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        id="profileImageFile"
                        onChange={(e) => {
                          formik.setFieldValue("profileImageFile", e.target.files[0]);
                          previewFile(e.target.files[0]);
                        }}
                      />
                      <small className="text-danger errorMsg">{formik.errors["profileImageFile"]}</small>
                    </>
                  )}
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
                        <div className="profilePage__box--value">{userDetails.lastName}</div>
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
                        <div className="profilePage__box--value">+91 {userDetails.mobileNumber}</div>
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
  userToken: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
