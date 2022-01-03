import React from "react";

import "./profile.scss";

import Avatar1 from "./../../assets/profile/avatar-1.svg";

const Profile = () => {
  return (
    <div className="container profilePage">
      <div className="row">
        <div className="col-12">
          <h2 className="profilePage__title">Your Profile</h2>
        </div>

        <div className="col-12 px-5 px-lg-0 profilePage__box">
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
                  <div className="profilePage__box--value">Harshit</div>
                </div>
                <div className="col-md-6 mt-4 mt-md-0">
                  <label htmlFor="firstName" className="profilePage__box--label">
                    Last Name
                  </label>
                  <div className="profilePage__box--value">Chouhan</div>
                </div>
              </div>

              <div className="row border-bottom pb-3 mt-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="profilePage__box--label">
                    Email
                  </label>
                  <div className="profilePage__box--value">harshitsinghchouhan@gmail.com</div>
                </div>
                <div className="col-md-6 mt-4 mt-md-0">
                  <label htmlFor="firstName" className="profilePage__box--label">
                    Mobile Number
                  </label>
                  <div className="profilePage__box--value">+91 8107136147</div>
                </div>
              </div>

              <div className="row border-bottom pb-3 mt-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="profilePage__box--label">
                    State
                  </label>
                  <div className="profilePage__box--value">Rajasthan</div>
                </div>
                <div className="col-md-6 mt-4 mt-md-0">
                  <label htmlFor="firstName" className="profilePage__box--label">
                    City
                  </label>
                  <div className="profilePage__box--value">Pali</div>
                </div>
              </div>

              <div className="row pb-3 mt-3">
                <div className="col-12">
                  <label htmlFor="firstName" className="profilePage__box--label">
                    Address
                  </label>
                  <div className="profilePage__box--value">1 - D - 23 New Housing Board, Pali (Marwar), Rajasthan, 306401</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
