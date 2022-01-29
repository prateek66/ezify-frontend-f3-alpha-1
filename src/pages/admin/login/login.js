import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./login.scss";

import BannerImg from "./../../../assets/admin_page/banner.svg";
import CustomButton from "../../../components/atmoic/customButton/customButton";
import FormControl from "../../../components/atmoic/formControl/formControl";
import { ApiCallsContext } from "../../../services/api.service";
import { API_URLS } from "../../../utlis/constants";
import { catchHandler } from "../../../utlis/catchHandler.utlis";
import { setCurrentUser, setCurrentUserToken } from "../../../redux/user/user.actions";

const Login = ({ setUser, setToken, history }) => {
  const ApiContext = useContext(ApiCallsContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      id: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().min(3).required("Required"),
      otp: Yup.string().min(4).max(4).required("Required"),
      id: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      verifyOtp();
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

  const sendOTP = async () => {
    if (formik.values.email) {
      const response = await catchHandler(sendOTPAPI);
      formik.setFieldValue("id", response._id);
      console.log("otpVerify", response.otpVerify);
    }
  };

  const sendOTPAPI = async () => {
    const postObj = {
      email: formik.values.email,
    };

    const data = await ApiContext.postData(API_URLS.SEND_OTP, postObj);
    return data;
  };

  const verifyOtp = async () => {
    const response = await catchHandler(verifyOTPAPI);
    console.log(response);
    console.log(response?.user?.roles !== "admin");
    if (response?.statusCode === "10001") {
      formik.setFieldError("otp", "Invalid OTP");
      return;
    }

    if (response?.user?.roles !== "admin") {
      formik.setFieldValue("otp", "", false);
      formik.setFieldValue("id", null, false);
      formik.setFieldError("email", "This email is not of admin");
      return;
    }

    setUser(response.user);
    setToken(response.token);
    history.push("/dashboard");
  };

  const verifyOTPAPI = async () => {
    const postObj = {
      id: formik.values.id,
      otp: formik.values.otp,
    };

    const data = await ApiContext.postData(API_URLS.VERIFY_OTP, postObj);
    return data;
  };

  return (
    <div className="container-fluid admin">
      <div className="row">
        <div className="col-md-6 px-0 d-flex align-items-center justify-content-center admin__container--left">
          <div className="admin__left d-flex align-items-center justify-content-center">
            <img src={BannerImg} alt="Banner" />
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center admin__container--right">
          <form className="admin__login" onSubmit={formik.handleSubmit}>
            <div className="admin__login--container d-flex flex-column align-items-center justify-content-between">
              <h3 className="mb-3">Login as Admin</h3>

              <div className="w-100">
                <FormControl {...emailAttributes} />
                <div className="sendOTP">
                  <span className={formik.errors.email ? "disable" : null} onClick={sendOTP}>
                    Send OTP
                  </span>
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

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(setCurrentUserToken(token)),
  setUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(withRouter(Login));
