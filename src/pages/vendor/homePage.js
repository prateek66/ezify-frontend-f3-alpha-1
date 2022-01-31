import React from "react";

import CustomButton from "../../components/atmoic/customButton/customButton";
import homeIllustration from "../../assets/vendor_home/Illustration 6.webp";
import user from "../../assets/vendor_home/user.webp";
import location from "../../assets/vendor_home/location.webp";
import server from "../../assets/vendor_home/Server.webp";
import image1 from "../../assets/vendor_home/image1.webp";
import "./homePage.scss";

function Homepage() {
  return (
    <div className="homePage px-3 px-lg-0">
      <div className="container">
        <div className="row py-4">
          <div className="col-lg-6 col-12 pt-lg-5">
            <p className="homePage__text">Earn More. Earn respect & Saftey Ensured</p>
            <p className="homePage__text--para text-color">
              Provide a network for all your needs with ease and fun using <b>LaslesVPN</b> discover interesting features from us.
            </p>

            <div className="row pt-3 pb-5 justify-content-between">
              <div className="py-2 col-lg-2 col-3 homePage__box d-flex justify-content-center align-items-center flex-column">
                <div className="">
                  <img src={user} alt="total user" />
                </div>
                <b className="mb-0 pl-1 homePage__text--vendor_number"> 90+ </b>
                <p className="homePage__text--vendor mb-0 text-color"> Vendors</p>
              </div>
              <div className="py-2 col-lg-2 col-3 homePage__box d-flex justify-content-center align-items-center flex-column">
                <div className="">
                  <img src={location} alt="total location" />
                </div>
                <b className="mb-0 pl-1 homePage__text--vendor_number"> 30+ </b>
                <p className="homePage__text--vendor mb-0 text-color"> Locations</p>
              </div>
              <div className="py-2 col-lg-2 col-3 homePage__box d-flex justify-content-center align-items-center flex-column">
                <div className="">
                  <img src={server} alt="total server" />
                </div>
                <b className="mb-0 pl-1 homePage__text--vendor_number"> 50+ </b>
                <p className="homePage__text--vendor mb-0 text-color"> Servers</p>
              </div>
              <div className="col-lg-1 col-0"></div>
              <div className="col-lg-1 col-0"></div>
              <div className="col-lg-1 col-0"></div>
            </div>
            <CustomButton type="button" text="GET IN TOUCH" classes="cp-2"></CustomButton>
          </div>
          <div className="col-lg-6 col-12">
            <img className="homePage__image" src={homeIllustration} alt= "homePage_image" />
          </div>
        </div>
      </div>
      <div className="container-fluid homePage__container-color">
        <div className="container">
          <div className="row py-4">
            <div className="col-lg-6">
              <p className="homePage__text--l1_text">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
            </div>
            <div className="col-lg-6">
              <p className="text-color homePage__text--l2_text">
                Provide a network for all your needs with ease and fun using <b>LaslesVPN</b> discover interesting features from us.
              </p>
              <p className="text-color homePage__text--l2_text">
                Provide a network for all your needs with ease and fun using <b>LaslesVPN</b> discover interesting features from us.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row py-5">
          <div className="col-lg-6">
            <img className="homePage__image-lower-section" src={image1} alt="lower_section" />
          </div>
          <div className="col-lg-6 pt-lg-0 pt-2">
            <p className="homePage__text--l1_text">Trusted by Thousands of Happy Customer</p>
            <div>
              <p className="text-color homePage__text--l2_text">
                Provide a network for all your needs with ease and fun using LaslesVPN discover interesting features from us.Provide a network for all
                your needs with ease and fun using LaslesVPN discover interesting features from us. discover interesting features from us.
              </p>
            </div>
            <div className="d-flex flex-row homePage__text--l2_text mt-3">
              <CustomButton type="button" text="SIGN UP NOW" classes="cp-2"></CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
