import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./login.scss";

import BannerImg from "./../../../assets/admin_page/banner.svg";
import CustomButton from "../../../components/atmoic/customButton/customButton";
import FormControl from "../../../components/atmoic/formControl/formControl";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().min(3).required("Required"),
      otp: Yup.string().min(4).max(4).required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const emailAttributes = {
    id: "email",
    label: "Email",
    isMandatory: true,
    type: "input-formik",
    formik,
  };

  const otpAttributes = {
    id: "otp",
    label: "OTP",
    isMandatory: true,
    type: "input-formik",
    formik,
  };

  const [buttonAttributes, setButtonAttributes] = useState({
    type: "submit",
    text: "Login",
    classes: "btn-block font-weight-bold",
    disabled: true,
  });

  console.log(formik.isValid);

  useEffect(() => {
    (() => formik.validateForm())();
  }, []);

  useEffect(() => {
    setButtonAttributes({
      type: "submit",
      text: "Login",
      classes: "btn-block font-weight-bold",
      disabled: !formik.isValid,
    });
  }, [formik.isValid]);

  return (
    <div className="container-fluid admin">
      <div className="row">
        <div className="col-md-6 px-0 d-flex align-items-center justify-content-center admin__container--left">
          <div className="admin__left d-flex align-items-center justify-content-center">
            <img src={BannerImg} alt="Banner" />
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center admin__container--right">
          <form className="admin__login">
            <div className="admin__login--container d-flex flex-column align-items-center justify-content-between">
              <h3 className="mb-3">Login as Admin</h3>

              <div className="w-100">
                <FormControl {...emailAttributes} />
                <div className="sendOTP">
                  <span>Send OTP</span>
                </div>
              </div>

              <div className="w-100 mb-4">
                <FormControl {...otpAttributes} />
              </div>

              <CustomButton {...buttonAttributes} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
