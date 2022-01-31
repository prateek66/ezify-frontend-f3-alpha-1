import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";

import CustomButton from "../../../atmoic/customButton/customButton";

import "./documentsPopup.scss";

import documentIcon from "./../../../../assets/signup/document.webp";
import checkedIcon from "./../../../../assets/signup/checked.webp";
import chevronDownIcon from "./../../../../assets/signup/chevron-down.webp";
import { useFormik } from "formik";

const DocumentsPopup = ({ prevStep, updateState, values, nextStep }) => {
  const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "image/jpg"];

  const formik = useFormik({
    initialValues: {
      profileImg: values?.profilePhoto ? values.profilePhoto : "",
      aadharCard: values?.aadharCard ? values.aadharCard : "",
      panCard: values?.panCard ? values.panCard : "",
    },
    validationSchema: Yup.object({
      profileImg: Yup.mixed()
        .required("Required")
        .test("FILE_SIZE", "File should be less than 3mb", (value) => !value || (value && value.size > 1024 * 3))
        .test("FILE_FORMAT", "File should be in png/jpg/jpeg format", (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))),
      aadharCard: Yup.mixed()
        .required("Required")
        .test("FILE_SIZE", "File should be less than 3mb", (value) => !value || (value && value.size > 1024 * 3))
        .test("FILE_FORMAT", "File should be in png/jpg/jpeg format", (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))),
      panCard: Yup.mixed()
        .required("Required")
        .test("FILE_SIZE", "File should be less than 3mb", (value) => !value || (value && value.size > 1024 * 3))
        .test("FILE_FORMAT", "File should be in png/jpg/jpeg format", (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))),
    }),
    onSubmit: (values) => {
      console.log(formik.isValid);
      if (formik.isValid) {
        nextStep();
      }
    },
  });

  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showAadharForm, setShowAadharForm] = useState(false);
  const [showPanForm, setShowPanForm] = useState(false);

  const [profilePreview, setProfilePreview] = useState(values?.profilePhotoPreview ? values.profilePhotoPreview : null);
  const [aadharPreview, setAadharPreview] = useState(values?.aadharCardPreview ? values.aadharCardPreview : null);
  const [panPreview, setPanPreview] = useState(values?.panCardPreview ? values.panCardPreview : null);

  const [nextBtnAttributes, setNextBtnAttributes] = useState({
    type: "submit",
    text: "NEXT",
    classes: "font-weight-bold cp-2",
    disabled: !formik.isValid,
  });

  const backBtnAttributes = {
    type: "button",
    text: "BACK",
    classes: "font-weight-bold cp-2",
    onClick: () => {
      if (showProfileForm || showAadharForm || showPanForm) {
        setShowProfileForm(false);
        setShowAadharForm(false);
        setShowPanForm(false);
      } else {
        prevStep();
      }
    },
  };

  useEffect(() => {
    setNextBtnAttributes({
      type: "submit",
      text: "NEXT",
      classes: "font-weight-bold cp-2",
      disabled: !formik.isValid,
    });
  }, [formik.isValid]);

  useEffect(() => {
    formik.validateForm();
  }, []);

  const uploadProfileBtnAttributes = {
    type: "button",
    text: "Upload Profile Photo",
    classes: "font-weight-bold customButton-ghost",
    onClick: () => document.getElementById("profilePhoto").click(),
  };

  const uploadAadharBtnAttributes = {
    type: "button",
    text: "Upload Aadhar Card",
    classes: "font-weight-bold customButton-ghost",
    onClick: () => document.getElementById("aadharCard").click(),
  };

  const uploadPanBtnAttributes = {
    type: "button",
    text: "Upload Pan Card",
    classes: "font-weight-bold customButton-ghost",
    onClick: () => document.getElementById("panCard").click(),
  };

  const previewFile = (file, fileName) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (fileName === "profile") {
          setProfilePreview(reader.result);
          updateState("profilePhoto", file);
          updateState("profilePhotoPreview", reader.result);
        } else if (fileName === "aadhar") {
          setAadharPreview(reader.result);
          updateState("aadharCard", file);
          updateState("aadharCardPreview", reader.result);
        } else if (fileName === "pan") {
          updateState("panCard", file);
          setPanPreview(reader.result);
          updateState("panCardPreview", reader.result);
        }
      };
    }
  };

  return (
    <div className="documentsPopup">
      <Modal.Header closeButton>📃 VENDOR PROFILE</Modal.Header>
      <Modal.Body>
        <div className="container">
          <p>
            Provide us the required documents and details to <br /> set up your account.
          </p>

          <form onSubmit={formik.handleSubmit}>
            {!showProfileForm && !showAadharForm && !showPanForm && (
              <>
                <div className="row">
                  <div
                    onClick={() => setShowProfileForm(true)}
                    className="col-6 documentsPopup__row d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <img src={documentIcon} alt="Document Icon" className="mr-3" />
                      <div>Profile Photo</div>
                      {formik.values["profileImg"] && <img src={checkedIcon} alt="Checked Icon" className="ml-3" />}
                    </div>
                    <img src={chevronDownIcon} alt="chevronDownIcon" />
                  </div>
                </div>

                <div className="row">
                  <div
                    onClick={() => setShowAadharForm(true)}
                    className="col-6 documentsPopup__row d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <img src={documentIcon} alt="Document Icon" className="mr-3" />
                      <div>Aadhar Card</div>
                      {formik.values["aadharCard"] && <img src={checkedIcon} alt="Checked Icon" className="ml-3" />}
                    </div>
                    <img src={chevronDownIcon} alt="chevronDownIcon" />
                  </div>
                </div>

                <div className="row  mb-4">
                  <div onClick={() => setShowPanForm(true)} className="col-6 documentsPopup__row d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <img src={documentIcon} alt="Document Icon" className="mr-3" />
                      <div>Pan Card</div>
                      {formik.values["panCard"] && <img src={checkedIcon} alt="Checked Icon" className="ml-3" />}
                    </div>
                    <img src={chevronDownIcon} alt="chevronDownIcon" />
                  </div>
                </div>
              </>
            )}

            {showProfileForm && (
              <div className="row mb-5">
                <div className="col-4">
                  <CustomButton {...uploadProfileBtnAttributes} />
                  <input
                    type="file"
                    hidden
                    accept="image/png, image/jpeg, image/jpg"
                    id="profilePhoto"
                    onChange={(e) => {
                      formik.setFieldValue("profileImg", e.target.files[0]);
                      previewFile(e.target.files[0], "profile");
                    }}
                  />
                  <div>
                    <small className="text-danger errorMsg">{formik.errors["profileImg"]}</small>
                  </div>
                </div>
                <div className="col-6 offset-2 documentsPopup__profilePhotoForm">
                  {profilePreview && !formik.errors["profileImg"] && <img src={profilePreview} alt="Profile" className="h-100 w-100" />}
                </div>
              </div>
            )}

            {showAadharForm && (
              <div className="row mb-5">
                <div className="col-4">
                  <CustomButton {...uploadAadharBtnAttributes} />
                  <input
                    type="file"
                    hidden
                    accept="image/png, image/jpeg, image/jpg"
                    id="aadharCard"
                    onChange={(e) => {
                      formik.setFieldValue("aadharCard", e.target.files[0]);
                      previewFile(e.target.files[0], "aadhar");
                    }}
                  />
                  <div>
                    <small className="text-danger errorMsg">{formik.errors["aadharCard"]}</small>
                  </div>
                </div>
                <div className="col-6 offset-2 documentsPopup__profilePhotoForm">
                  {aadharPreview && !formik.errors["aadharCard"] && <img src={aadharPreview} alt="Profile" className="h-100 w-100" />}
                </div>
              </div>
            )}

            {showPanForm && (
              <div className="row mb-5">
                <div className="col-4">
                  <CustomButton {...uploadPanBtnAttributes} />
                  <input
                    type="file"
                    hidden
                    accept="image/png, image/jpeg, image/jpg"
                    id="panCard"
                    onChange={(e) => {
                      formik.setFieldValue("panCard", e.target.files[0]);
                      previewFile(e.target.files[0], "pan");
                    }}
                  />
                  <div>
                    <small className="text-danger errorMsg">{formik.errors["panCard"]}</small>
                  </div>
                </div>
                <div className="col-6 offset-2 documentsPopup__profilePhotoForm">
                  {panPreview && !formik.errors["panCard"] && <img src={panPreview} alt="Profile" className="h-100 w-100" />}
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-12 d-flex align-items-center justify-content-between">
                <CustomButton {...backBtnAttributes} />
                {!showProfileForm && !showAadharForm && !showPanForm && <CustomButton {...nextBtnAttributes} />}
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </div>
  );
};

export default DocumentsPopup;
