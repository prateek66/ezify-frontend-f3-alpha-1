import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./serviceForm.scss";
import FormControl from "../atmoic/formControl/formControl";
import CustomButton from "../atmoic/customButton/customButton";

const ServiceForm = ({ setShow }) => {
  const [preview, setPreview] = useState(null);

  const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "image/jpg"];

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: "",
      file: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3).max(20).required("Required"),
      description: Yup.string().min(15).max(250).required("Required"),
      file: Yup.mixed()
        .required()
        .test("FILE_SIZE", "File should be less than 3mb", (value) => !value || (value && value.size > 1024 * 3))
        .test("FILE_FORMAT", "File should be in png/jpg/jpeg format", (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))),
    }),
  });

  const serviceNameAttributes = {
    id: "name",
    label: "Service Name",
    isMandatory: true,
    type: "input-formik",
    formik,
  };

  const descriptionAttributes = {
    id: "description",
    label: "description",
    isMandatory: true,
    type: "textarea-formik",
    rows: 8,
    formik,
  };

  const updateButtonAttributes = {
    type: "button",
    text: "Upload Image",
    classes: "font-weight-bold",
    onClick: () => document.getElementById("file").click(),
  };

  const previewFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  };

  const [submitButtonAttributes, setSubmitButtonAttributes] = useState({
    type: "suubmit",
    text: "Submit",
    classes: "font-weight-bold",
    disabled: !formik.isValid,
  });

  useEffect(() => {
    setSubmitButtonAttributes({
      type: "suubmit",
      text: "Submit",
      classes: "font-weight-bold",
      disabled: !formik.isValid,
    });
  }, [formik.isValid]);

  useEffect(() => {
    formik.validateForm();
  }, []);

  return (
    <div className="serviceForm">
      <Modal.Header closeButton onClick={() => setShow(false)}>
        ADD NEW SERVICE
      </Modal.Header>

      <Modal.Body>
        <p>Hi Admin to add a new service please fill the below details</p>

        <div className="row">
          <div className="col-md-7">
            <FormControl {...serviceNameAttributes} />
            <FormControl {...descriptionAttributes} />
          </div>
          <div className="col-md-5">
            <label htmlFor="serviceImage" className="formControl-label">
              * Image
            </label>
            <div>
              <CustomButton {...updateButtonAttributes} />
            </div>
            <input
              type="file"
              hidden
              accept="image/png, image/jpeg, image/jpg"
              id="file"
              onChange={(e) => {
                formik.setFieldValue("file", e.target.files[0]);
                previewFile(e.target.files[0]);
              }}
            />
            <small className="text-danger errorMsg">{formik.errors["file"]}</small>

            {preview && (
              <div className="mt-3">
                <img src={preview} alt="Profile" className="serviceForm__img" />
              </div>
            )}
          </div>

          <div className="col-12 text-center">
            <CustomButton {...submitButtonAttributes} />
          </div>
        </div>
      </Modal.Body>
    </div>
  );
};

export default ServiceForm;
