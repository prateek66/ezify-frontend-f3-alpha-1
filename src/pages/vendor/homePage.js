import React from "react";

import CustomButton from "../../components/atmoic/customButton/customButton";
import BannerCarousel from "../../components/bannerCarousel/bannerCarousel";

import homeIllustration from "../../assets/vendor_home/Illustration 6.svg";
import user from "../../assets/vendor_home/user.svg";
import location from "../../assets/vendor_home/location.svg";
import server from "../../assets/vendor_home/Server.svg";
import image1 from "../../assets/vendor_home/image1.svg";
import "./homePage.scss";

function Homepage() {
  return (
    <div className="container homePage">
      <div className="row">
        <div className="col-lg-7 mb-5">
          <b className="homePage__text">Earn More.Earn respect & Saftey ensured</b>
          <p className="homePage__text--para">
            Provide a network for all your needs with ease and fun using LaslesVPN discover interesting features from us.
          </p>

          <div className="d-flex flex-wrap flex-row pt-4 mb-5">
            <div className="col-md-2 px-5 pl-lg-5 d-flex justify-content-center homePage__box">
              <div className="row pt-3 homePage__box--row">
                <div className="">
                  <img src={user} alt="total user" />
                </div>
                <b className="pt-1 mb-0 pl-2 homePage__text--vendor_number"> 90+ </b>
                <p className="homePage__text--vendor"> Vendors</p>
              </div>
            </div>

            <div className="col-md-2 px-5 pl-lg-5 d-flex justify-content-center homePage__box">
              <div className="row pt-3 homePage__box--row">
                <div className="">
                  <img src={location} alt="total location" />
                </div>
                <b className="pt-1 mb-0 pl-2 homePage__text--vendor_number"> 30+ </b>
                <p className="homePage__text--vendor"> Locations</p>
              </div>
            </div>

            <div className="col-md-2 px-5 pl-lg-5 d-flex justify-content-center homePage__box">
              <div className="row pt-3 homePage__box--row">
                <div className="">
                  <img src={server} alt="total server" />
                </div>
                <b className="pt-1 mb-0 pl-2 homePage__text--vendor_number"> 50+ </b>
                <p className="homePage__text--vendor"> Servers</p>
              </div>
            </div>
          </div>
          <CustomButton type="button" text="GET IN TOUCH"></CustomButton>
        </div>
        <div className="col-lg-5 text-right">
          <img className="h-100 w-100" src={homeIllustration} />
        </div>

        <div className="container-fluid homePage__container_l1 pt-0 mb-5">
          <div className="d-flex flex-row ">
            <div className="col-lg-7">
              <p className="homePage__text--l1_text">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
            </div>

            <div className="col-lg-7 homePage__text--l2_text">
              <p>
                Provide a network for all your needs with ease and fun using LaslesVPN discover interesting features from us. Provide a network for
                all your needs with ease and fun using LaslesVPN discover interesting features from us. discover
              </p>
            </div>
          </div>
        </div>

        <div className="container-fluid homePage__container_l1--container_l2">
          <div className="d-flex flex-row">
            <div className="col-lg-7 pl-0 mr-5">
              <img className="h-100 w-100" src={image1} alt="image 1" />
            </div>
            <div className="col-lg-5 homePage__text--l1_text">
              <b> Trusted by Thousands of Happy Customer </b>

              <div className="d-flex flex-row homePage__text--l2_text mt-3">
                <p>
                  Provide a network for all your needs with ease and fun using LaslesVPN discover interesting features from us.Provide a network for
                  all your needs with ease and fun using LaslesVPN discover interesting features from us. discover interesting features from us.
                </p>
              </div>
              <div className="d-flex flex-row homePage__text--l2_text mt-3">
                <CustomButton type="button" text="SIGN UP NOW"></CustomButton>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5 mb-5">
          <div className="d-flex justify-content-center homePage__text--l3_text">
            <b> Our Customers Can Say Very Much About Us </b>
          </div>
        </div>

        <div className= "container-fluid">
          <BannerCarousel />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
