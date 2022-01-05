import React, { useState } from "react";
import CustomButton from "../atmoic/customButton/customButton";
import ModalBase from "../atmoic/modal/modal";

import UserSignup from "../signup/user/userSignup";

import "./Header.scss";

const Header = () => {
  const [show, setShow] = useState(false);
  const [size, setSize] = useState("md");

  const handleClose = () => {
    setSize("md");
    setShow(false);
  };
  
  const handleShow = () => setShow(true);

  return (
    <>
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
                <CustomButton type="button" text="Sign Up" onClick={handleShow}></CustomButton>
                <CustomButton type="button" text="Sign In" classes="customButton-ghost" onClick={handleShow}></CustomButton>
              </div>
            </div>
          </div>
        </div>
      </header>

      <ModalBase show={show} handleClose={handleClose} handleShow={handleShow} dialogClassName="signup" size={size}>
        <>
          <UserSignup setSize={setSize} handleClose={handleClose}></UserSignup>
        </>
      </ModalBase>
    </>
  );
};

export default Header;
