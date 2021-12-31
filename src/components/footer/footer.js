import React from "react";
import "./footer.scss";

import facebookIcon from "./../../assets/footer/facebook.png";
import instagramIcon from "./../../assets/footer/instagram.png";
import twitterIcon from "./../../assets/footer/twitter.png";
import linkedinIcon from "./../../assets/footer/linkedin.png";

const socialLinks = [
  {
    name: "facebook",
    icon: facebookIcon,
  },
  {
    name: "instagram",
    icon: instagramIcon,
  },
  {
    name: "twitter",
    icon: twitterIcon,
  },
  {
    name: "linkedin",
    icon: linkedinIcon,
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-6">
            <div className="row">
              <div className="col-sm-4">
                <div className="footer__link-title">Mobile App</div>
                <ul className="footer__links-list">
                  <li className="footer__links">Features</li>
                  <li className="footer__links">Live Track</li>
                </ul>
              </div>
              <div className="col-sm-4">
                <div className="footer__link-title">Community</div>
                <ul className="footer__links-list">
                  <li className="footer__links">Featured Vendors</li>
                  <li className="footer__links">Testimonials</li>
                  <li className="footer__links">Live events</li>
                </ul>
              </div>
              <div className="col-sm-4">
                <div className="footer__link-title">Company</div>
                <ul className="footer__links-list">
                  <li className="footer__links">About Us</li>
                  <li className="footer__links">Contact Us</li>
                  <li className="footer__links">History</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-lg-5">
          <div className="col-md-6 col-lg-3">© Ezzify, Inc. 2022. Unbox Zindagi!</div>
          <div className="col-md-6 col-lg-3 offset-lg-6 mt-3 mt-md-0 d-flex align-items-center">
            <div className="footer__social-links">Follow Us :</div>
            <ul className="footer__social-links--list">
              {socialLinks.map((link, index) => (
                <li className="footer__social-links--list--item" title={link.name} key={index}>
                  <img src={link.icon} alt={link.name} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
