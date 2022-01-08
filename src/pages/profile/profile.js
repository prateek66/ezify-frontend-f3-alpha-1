import React, { useState } from "react";

import "./profile.scss";

import Avatar1 from "./../../assets/profile/avatar-1.svg";
import CustomButton from "../../components/atmoic/customButton/customButton";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserDetails } from "../../redux/user/user.selectors";

const Profile = ({ userDetails }) => {
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => setUpdate(true);
  const handleSave = () => setUpdate(false);
  const handleDiscard = () => setUpdate(false);

  const updateButtonAttributes = {
    type: "button",
    text: "Update Profile",
    classes: "font-weight-bold",
    onClick: handleUpdate,
  };

  const saveButtonAttributes = {
    type: "button",
    text: "Save Changes",
    classes: "font-weight-bold mr-3",
    onClick: handleSave,
  };

  const discardButtonAttributes = {
    type: "button",
    text: "Discard Changes",
    classes: "font-weight-bold red-btn",
    onClick: handleDiscard,
  };

  return (
    <div className="container profilePage">
      <div className="row">
        <div className="col-12">
          <h2 className="profilePage__title">Your Profile</h2>
        </div>

        <div className="col-12 px-5 pl-lg-3 profilePage__box">
          <div className="row mt-3">
            <div className="col-12 d-flex align-items-center justify-content-end">
              {!update && <CustomButton {...updateButtonAttributes} />}
              {update && <CustomButton {...saveButtonAttributes} />}
              {update && <CustomButton {...discardButtonAttributes} />}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 mb-5 mb-lg-0 d-flex align-items-start justify-content-center">
              <div className="profilePage__image">
                <img src={Avatar1} alt="Profile" />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row border-bottom pb-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="profilePage__box--label">
                    First Name
                  </label>
                  {!update && <div className="profilePage__box--value">{userDetails.firstName}</div>}
                  {update && <input type="text" value="Harshit" className="form-control formControl-input" />}
                </div>
                <div className="col-md-6 mt-4 mt-md-0">
                  <label htmlFor="firstName" className="profilePage__box--label">
                    Last Name
                  </label>
                  {!update && <div className="profilePage__box--value">{userDetails.lastname}</div>}
                  {update && <input type="text" value="Chouhan" className="form-control formControl-input" />}
                </div>
              </div>

              <div className="row border-bottom pb-3 mt-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="profilePage__box--label">
                    Email
                  </label>
                  <div className="profilePage__box--value">{userDetails.email}</div>
                </div>
                <div className="col-md-6 mt-4 mt-md-0">
                  <label htmlFor="firstName" className="profilePage__box--label">
                    Mobile Number
                  </label>
                  {!update && <div className="profilePage__box--value">+91 {userDetails.mobile_number}</div>}
                  {update && <input type="text" value="+91 8107136147" className="form-control formControl-input" />}
                </div>
              </div>

              <div className="row border-bottom pb-3 mt-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="profilePage__box--label">
                    State
                  </label>
                  {!update && <div className="profilePage__box--value">{userDetails.state}</div>}
                  {update && <input type="text" value="Rajasthan" className="form-control formControl-input" />}
                </div>
                <div className="col-md-6 mt-4 mt-md-0">
                  <label htmlFor="firstName" className="profilePage__box--label">
                    City
                  </label>
                  {!update && <div className="profilePage__box--value">{userDetails.city}</div>}
                  {update && <input type="text" value="Pali" className="form-control formControl-input" />}
                </div>
              </div>

              <div className="row pb-3 mt-3">
                <div className="col-12">
                  <label htmlFor="firstName" className="profilePage__box--label">
                    Address
                  </label>
                  {!update && <div className="profilePage__box--value">{userDetails.address}</div>}
                  {update && (
                    <textarea value="1 - D - 23 New Housing Board, Pali (Marwar), Rajasthan, 306401" className="form-control formControl-input" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userDetails: selectUserDetails,
});

export default connect(mapStateToProps, null)(Profile);
