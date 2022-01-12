import React from "react";

import "./adminServiceTile.scss";

import serviceBannerImg from "./../../assets/dashboard/serviceBannerImg.svg";

import deleteIcon from "./../../assets/profile/deleteIcon.svg";
import editIcon from "./../../assets/profile/edit-icon.svg";

const AdminServiceTile = () => {
  return (
    <div className="row border-bottom mb-3">
      <div className="col-3">
        <img src={serviceBannerImg} alt="serviceBannerImg" />
      </div>
      <div className="col-9">
        <div className="d-flex align-items-start justify-content-between">
          <div className="adminServiceTile__heading mb-2">
            <div className="adminServiceTile__heading--title">Plumming</div>
            <div className="adminServiceTile__heading--date">16 December, 2021</div>
          </div>
          <div className="d-flex align-items-center justify-content-between adminServiceTile__icons">
            <img src={editIcon} alt="editIcon" className="mr-2" />
            <img src={deleteIcon} alt="deleteIcon" />
          </div>
        </div>
        <p className="adminServiceTile__desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt, nisl sed fringilla consequat, purus diam congue velit, eu rutrum
          diam ipsum vel sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras diam ipsum vel sem.
          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras read more...
        </p>
      </div>
    </div>
  );
};

export default AdminServiceTile;
