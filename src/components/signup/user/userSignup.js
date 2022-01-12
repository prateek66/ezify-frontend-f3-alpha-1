import React, { Component } from "react";
import EmailPopup from "./emailPopup/emailPopup";
import OtpPopup from "./otpPopup/otpPopup";
import PersonalDetails from "./personalDetails/personalDetails";
import Success from "./success/success";

export class UserSignup extends Component {
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
    this.setState({ [field]: value });
  };

  render() {
    const { step } = this.state;
    const { email, id, otp, firstName, lastName, state, city, address, mobileNumber, token, stateCode } = this.state;
    const values = { email, id, otp, firstName, lastName, state, city, address, mobileNumber, token, stateCode };

    switch (step) {
      case 1:
        return <EmailPopup nextStep={this.nextStep} handleChange={this.handleChange} updateState={this.updateState} values={values} />;

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
        return <PersonalDetails nextStep={this.nextStep} handleChange={this.handleChange} updateState={this.updateState} values={values} />;

      case 4:
        return <Success />;

      default:
        console.log("This is a multi-step form built with React.");
    }
  }
}

export default UserSignup;
