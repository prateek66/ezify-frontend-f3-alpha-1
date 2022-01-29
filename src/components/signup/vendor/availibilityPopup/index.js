import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import moment from "moment";

import CustomButton from "../../../atmoic/customButton/customButton";
import FormControl from "../../../atmoic/formControl/formControl";

import "./availibilityPopup.scss";

const AvailibilityPopup = ({ values, prevStep, updateState, onFinalSubmit }) => {
  const daysOptions = [
    { label: "Monday", value: "Mon" },
    { label: "Tuesday", value: "Tue" },
    { label: "Wednesday", value: "Wed" },
    { label: "Thursday", value: "Thu" },
    { label: "Friday", value: "Fri" },
    { label: "Saturday", value: "Sat" },
    { label: "Sunday", value: "Sun" },
  ];

  const backBtnAttributes = {
    type: "button",
    text: "BACK",
    classes: "font-weight-bold cp-2",
    onClick: prevStep,
  };

  const [submitBtnAttributes, setSubmitBtnAttributes] = useState({
    type: "submit",
    text: "Submit",
    classes: "font-weight-bold cp-2",
    disabled: true,
  });

  const format = "h:00 A";
  const startTimeInitialValue = moment(values.availableStartTime).format(format);
  const endTimeInitialValue = moment(values.availableEndTime).format(format);

  let availableTime;

  if (values.availableEndTime) {
    availableTime = `${startTimeInitialValue} - ${endTimeInitialValue}`;
  }

  const formik = useFormik({
    initialValues: {
      availabaleDate: "",
      availableTime: availableTime,
    },
    validationSchema: Yup.object({
      availabaleDate: Yup.string(),
      availableTime: Yup.string().required("Required"),
    }),
    onSubmit: () => {
        console.log(formik.isValid);
      if (formik.isValid) {
        onFinalSubmit();
      }
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, []);

  useEffect(() => {
    setSubmitBtnAttributes({
      type: "submit",
      text: "Submit",
      classes: "font-weight-bold cp-2",
      disabled: !formik.isValid,
    });
  }, [formik.isValid]);

  const daysFormControlAttributes = {
    id: "availabaleDate",
    label: "Availabale Days",
    isMandatory: true,
    type: "select-formik",
    options: daysOptions,
    formik,
    isMulti: true,
    defaultValue: values.availableDays,
    onChange: (value) => {
      updateState("availableDays", value);
      formik.setFieldValue("availabaleDate", value[0]?.value);
    },
  };

  const disabledHours = (startingHour) => {
    let hours = [];
    for (let i = startingHour; i >= 0; i--) {
      hours.push(i);
    }

    return hours;
  };

  const startTimeAttributes = {
    id: "availableStartTime",
    label: "Start Time",
    isMandatory: true,
    type: "time-picker",
    showMinute: false,
    defaultValue: values.availableStartTime,
    format: format,
    onChange: (startTimeValue) => {
      setEndTimeAttributes({
        id: "availableEndTime",
        label: "End Time",
        isMandatory: true,
        type: "time-picker",
        disabled: false,
        showMinute: false,
        disabledHours: () => disabledHours(moment(startTimeValue).hours()),
        defaultValue: values.availableEndTime,
        format: format,
        onChange: (endTimeValue) => {
          updateState("availableStartTime", startTimeValue);
          updateState("availableEndTime", endTimeValue);
          const startTime = moment(startTimeValue).format(format);
          const endTime = moment(endTimeValue).format(format);

          console.log(`${startTime} - ${endTime}`);
          updateState("availableTime", `${startTime} - ${endTime}`);

          formik.setFieldValue("availableTime", `${startTime} - ${endTime}`);
        },
      });
    },
  };

  const [endTimeAttributes, setEndTimeAttributes] = useState({
    id: "availableEndTime",
    label: "End Time",
    isMandatory: true,
    type: "time-picker",
    disabled: values.availableEndTime ? false : true,
    showMinute: false,
    defaultValue: values.availableEndTime,
    format: format,
    onChange: (endTimeValue) => {
      console.log(endTimeValue);
      updateState("availableEndTime", endTimeValue);

      const startTime = moment(values.availableStartTime).format(format);
      const endTime = moment(endTimeValue).format(format);

      console.log(`${startTime} - ${endTime}`);
      updateState("availableTime", `${startTime} - ${endTime}`);

      formik.setFieldValue("availableTime", `${startTime} - ${endTime}`);
    },
  });

  return (
    <div className="availibilityPopup">
      <Modal.Header closeButton>📃 Hi, {values.firstName}</Modal.Header>
      <Modal.Body>
        <div className="container">
          <p>
            Select the available time slots on which <br />
            you are going to provide services to the users. <br />
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-12">
                <FormControl {...daysFormControlAttributes} />
              </div>

              <div className="col-3">
                <FormControl {...startTimeAttributes} />
              </div>
              <div className="col-3">
                <FormControl {...endTimeAttributes} />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 d-flex align-items-center justify-content-between">
                <CustomButton {...backBtnAttributes} />
                <CustomButton {...submitBtnAttributes} />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </div>
  );
};

export default AvailibilityPopup;
