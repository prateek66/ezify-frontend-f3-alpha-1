import React from "react";
import CustomButton from "../atmoic/customButton/customButton";
import FormControl from "../atmoic/formControl/formControl";
import "./bannerForm.scss";

const BannerForm = () => {
  const cityFormControlAttributes = {
    id: "city",
    label: "City",
    isMandatory: false,
    type: "input",
  };

  const servicesFormControlAttributes = {
    id: "services",
    label: "Services",
    isMandatory: false,
    type: "input",
  };

  return (
    <div className="bannerForm">
      <div className="bannerForm-heading">Find Services</div>

      <form className="bannerForm-form">
        <div className="row">
          <div className="col-12">
            <FormControl {...cityFormControlAttributes}></FormControl>
          </div>
          <div className="col-12">
            <FormControl {...servicesFormControlAttributes}></FormControl>
          </div>
          <div className="col-12 mt-2 d-flex align-items-center justify-content-end">
            <CustomButton type="submit" text="Search" classes="cp-2"></CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BannerForm;
