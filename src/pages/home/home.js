import React from "react";
import BannerCarousel from "../../components/bannerCarousel/bannerCarousel";
import BannerForm from "../../components/bannerForm/bannerForm";

import "./home.scss";

import cleaningIcon from "./../../assets/home_page/cleaning_service_icon.svg";
import laundryIcon from "./../../assets/home_page/laundry_service_icon.svg";
import paintingIcon from "./../../assets/home_page/painting_service_icon.svg";
import repairingIcon from "./../../assets/home_page/repairing_service_icon.svg";

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
      name: "painting",
      icon: paintingIcon,
    },
    {
      name: "repairing",
      icon: repairingIcon,
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
    </main>
  );
};

export default Home;
