import React from "react";
import CustomButton from "../customButton/customButton";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-1">
            <div className="logo-container"></div>
          </div>
          <div className="col-4 offset-7">
            <div className="button-group d-flex align-items-center justify-content-between">
              <a href="#" className="button-vendor">
                Become a Vendor
              </a>
              <CustomButton type="button" text="Sign Up"></CustomButton>
              <CustomButton type="button" text="Sign In" classes="customButton-ghost"></CustomButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
