import React from "react";
import BannerCarousel from "../../components/bannerCarousel/bannerCarousel";
import BannerForm from "../../components/bannerForm/bannerForm";
import "./home.scss";

const Home = () => {
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
        </div>
      </section>
    </main>
  );
};

export default Home;
