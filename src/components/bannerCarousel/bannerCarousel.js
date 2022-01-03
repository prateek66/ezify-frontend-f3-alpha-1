import React from "react";
import { Carousel } from "react-bootstrap";

import "./bannerCarousel.scss";

const BannerCarousel = () => {
  return (
    <div className="bannerCarousel">
      <div className="bannerCarousel-heading">Why Choose Us</div>

      <div className="bannerCarousel-carousel">
        <Carousel indicators={false} prevLabel="" nextLabel="">
          <Carousel.Item>
            <div className="carousel-item-text">Provides reliable, affordable</div>
            <div className="carousel-item-text text-right pr-4">
              and <span>trusted services</span>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-item-text">Simplified budget and </div>
            <div className="carousel-item-text text-right">
              <span>cost management</span>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-item-text">Its all-in-one platform helps </div>
            <div className="carousel-item-text text-right pr-4">
              users hire any <span>professional</span>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* <div className="bannerCarousel-carousel">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="carousel-item-text">Provides reliable, affordable</div>
              <div className="carousel-item-text text-right pr-4">
                and <span>trusted services</span>
              </div>
            </div>
            <div className="carousel-item">
              <div className="carousel-item-text">Simplified budget and </div>
              <div className="carousel-item-text text-right">
                <span>cost management</span>
              </div>
            </div>
            <div className="carousel-item">
              <div className="carousel-item-text">Its all-in-one platform helps </div>
              <div className="carousel-item-text text-right pr-4">
                users hire any <span>professional</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BannerCarousel;
