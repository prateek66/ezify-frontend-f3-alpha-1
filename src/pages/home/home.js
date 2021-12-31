import React from "react";
import BannerCarousel from "../../components/bannerCarousel/bannerCarousel";
import BannerForm from "../../components/bannerForm/bannerForm";

import "./home.scss";

import cleaningIcon from "./../../assets/home_page/cleaning_service_icon.svg";
import laundryIcon from "./../../assets/home_page/laundry_service_icon.svg";
import paintingIcon from "./../../assets/home_page/painting_service_icon.svg";
import repairingIcon from "./../../assets/home_page/repairing_service_icon.svg";
import covidFrame from "./../../assets/home_page/covid_frame.svg";

const Home = () => {
  const homePageServices = [
    {
      name: "cleaning",
      icon: cleaningIcon,
    },
    {
      name: "laundry",
      icon: laundryIcon,
    },
    {
      name: "repairing",
      icon: repairingIcon,
    },
    {
      name: "painting",
      icon: paintingIcon,
    },
  ];

  return (
    <main>
      <section className="section-hero">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <BannerForm />
            </div>
            <div className="col-8">
              <BannerCarousel />
            </div>
          </div>
          <div className="row mt-5">
            {homePageServices.map((service, index) => {
              return (
                <div className="col-3" key={index}>
                  <div className="service-container">
                    <div className="service-container__name">
                      <span className="service-container__name--formatted">{service.name}</span> services
                    </div>
                    <div className="service-container__icon">
                      <img src={service.icon} alt={service.name} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-covid">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="section-covid__container">
                <img src={covidFrame} alt="Covid Frame" />
              </div>
            </div>
            <div className="col-5 offset-1 d-flex flex-column align-items-start justify-content-center">
              <h3 className="section-covid__heading">Fully Vaccinated</h3>
              <p className="section-covid__text">
                Our Service Provoiders are Fully Vaccinated and they follow proper covid protocols so that we can provide you the best services while
                you safe.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
