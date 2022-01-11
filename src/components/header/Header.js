import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory } from "react-router-dom";

import { setCurrentUser, setCurrentUserToken } from "../../redux/user/user.actions";
import { selectToken, selectUserDetails } from "../../redux/user/user.selectors";

import CustomButton from "../atmoic/customButton/customButton";
import ModalBase from "../atmoic/modal/modal";
import ProfileOptions from "../profileOptions/profileOptions";

import UserSignup from "../signup/user/userSignup";

import "./Header.scss";

const Header = ({ token, setToken, userDetails, setUser, showVendorBtn }) => {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [size, setSize] = useState("md");

  const handleClose = () => {
    setSize("md");
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleSignupSignIn = () => {
    if (token) {
      setToken(null);
      setUser(null);
      history.push("/");
    } else {
      handleShow();
    }
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-1">
              <div className="logo-container"></div>
            </div>
            <div className="col-7 offset-4">
              <div className="button-group d-flex align-items-center justify-content-end">
                {showVendorBtn && (
                  <a href="#" className="button-vendor mr-3">
                    Become a Vendor
                  </a>
                )}
                <CustomButton type="button" text={token ? "Sign Out" : "Sign In"} onClick={handleSignupSignIn}></CustomButton>
                {token && <ProfileOptions {...userDetails} />}
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

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  userDetails: selectUserDetails,
});

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(setCurrentUserToken(token)),
  setUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
