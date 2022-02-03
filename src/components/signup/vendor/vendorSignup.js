import { Component, useContext } from "react";
import moment from "moment";

import EmailPopup from "../user/emailPopup/emailPopup";
import OtpPopup from "../user/otpPopup/otpPopup";
import PersonalDetails from "../user/personalDetails/personalDetails";
import Success from "../user/success/success";
import DocumentsPopup from "./documentsPopup";
import ServicesPopup from "./servicesPopup";
import { API_URLS, config } from "../../../utlis/constants";
import { setSpinner } from "../../../redux/spinner/spinner.actions";
import { connect } from "react-redux";
import axios from "axios";
import { decryption, encyption } from "../../../utlis/security.utlis";
import AvailibilityPopup from "./availibilityPopup";

export class VendorSignup extends Component {
  state = {
    step: 1,
    email: "",
    id: "",
    otp: "",
    firstName: "",
    lastName: "",
    state: "",
    stateCode: "",
    city: "",
    address: "",
    mobileNumber: "",
    token: "",
    aadharCard: "",
    panCard: "",
    profilePhoto: "",
    aadharCardPreview: "",
    panCardPreview: "",
    profilePhotoPreview: "",
    services: [],
    availableDays: [],
    availableTime: "",
    availableStartTime: moment().hour(0).minute(0),
    availableEndTime: null,
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    if (step > 1) {
      this.props.setSize("lg");
    }

    this.setState({
      step: step + 1,
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  updateState = (field, value) => {
    this.setState({ [field]: value }, () => {
    });
  };

  patchData = (url, postObj, options) => {
    this.props.setSpinner(true);
    return new Promise((resolve, reject) => {
      const path = `${config.BASE_URL}${url}`;

      let data = postObj;
      if (config.ENVIRONMENT === "PROD" && url !== API_URLS.UPDATE_USER && url !== API_URLS.UPDATE_VENDOR) {
        data = {
          data: encyption(postObj),
        };
      }

      axios
        .patch(path, data, options)
        .then((response) => {
          let resData = response.data.data;
          if (config.ENVIRONMENT === "PROD") {
            resData = decryption(resData);
          }
          this.props.setSpinner(false);
          resolve(resData);
        })
        .catch((err) => {
          this.props.setSpinner(false);
          const errorResponse = err.response.data;
          reject(errorResponse);
        });
    });
  };

  onFinalSubmit = async () => {
    const { firstName, lastName, state, city, mobileNumber, token, aadharCard, panCard, profilePhoto, services, availableTime, availableDays } =
      this.state;

    const updatedAvailableDate = [];

    availableDays.forEach((day) => {
      updatedAvailableDate.push(day.value);
    });



    const updatedServices = [];

    services.forEach((service) => {
      updatedServices.push({
        id: service.value,
        basePrice: service.basePrice,
      });
    });

    let formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("mobileNumber", mobileNumber);
    formData.append("profileImage", profilePhoto);
    formData.append("adharCardImage", aadharCard);
    formData.append("panCardImage", panCard);
    formData.append("isActive", true);
    formData.append("isEmailVerified", true);
    formData.append("availabaleDate", updatedAvailableDate.toString());
    formData.append("availableTime", availableTime);

    updatedServices.forEach((service, index) => {
      formData.append(`services[${index}][serviceID]`, service.id);
      formData.append(`services[${index}][basePrice]`, service.basePrice);
    });

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = await this.patchData(API_URLS.UPDATE_VENDOR, formData, { headers });

    this.nextStep();
    console.log(data);
  };

  render() {
    const { step } = this.state;
    const {
      email,
      id,
      otp,
      firstName,
      lastName,
      state,
      city,
      address,
      mobileNumber,
      token,
      stateCode,
      aadharCard,
      panCard,
      profilePhoto,
      profilePhotoPreview,
      panCardPreview,
      aadharCardPreview,
      services,
      availableDays,
      availableStartTime,
      availableEndTime,
      availableTime,
    } = this.state;
    const values = {
      email,
      id,
      otp,
      firstName,
      lastName,
      state,
      city,
      address,
      mobileNumber,
      token,
      stateCode,
      aadharCard,
      panCard,
      profilePhoto,
      profilePhotoPreview,
      panCardPreview,
      aadharCardPreview,
      services,
      availableDays,
      availableStartTime,
      availableEndTime,
      availableTime,
    };

    switch (step) {
      case 1:
        return <EmailPopup nextStep={this.nextStep} handleChange={this.handleChange} updateState={this.updateState} values={values} type="vendor" />;

      case 2:
        return (
          <OtpPopup
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleClose={this.props.handleClose}
            updateState={this.updateState}
            prevStep={this.prevStep}
            values={values}
          />
        );

      case 3:
        return (
          <PersonalDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            updateState={this.updateState}
            values={values}
            usertype="vendor"
          />
        );

      case 4:
        return <DocumentsPopup prevStep={this.prevStep} updateState={this.updateState} values={values} nextStep={this.nextStep} />;

      case 5:
        return (
          <ServicesPopup
            prevStep={this.prevStep}
            updateState={this.updateState}
            values={values}
            nextStep={this.nextStep}
            onFinalSubmit={this.onFinalSubmit}
          />
        );

      case 6:
        return (
          <AvailibilityPopup
            prevStep={this.prevStep}
            updateState={this.updateState}
            values={values}
            nextStep={this.nextStep}
            onFinalSubmit={this.onFinalSubmit}
          />
        );

      case 7:
        return <Success type="vendor" />;

      default:
        console.log("This is a multi-step form built with React.");
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSpinner: (config) => dispatch(setSpinner(config)),
});

export default connect(null, mapDispatchToProps)(VendorSignup);
