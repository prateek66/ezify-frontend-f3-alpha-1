import React from "react";

import "./adminServiceTile.scss";

import deleteIcon from "./../../assets/profile/deleteIcon.svg";
import editIcon from "./../../assets/profile/edit-icon.svg";

const moment = require("moment");

const AdminServiceTile = ({ _id, image, name, updatedAt, description }) => {
  return (
    <div className="row border-bottom mb-3">
      <div className="col-3">
        <div className="adminServiceTile__img">
          <img src={image} alt="serviceBannerImg" className="h-100 w-100" />
        </div>
      </div>
      <div className="col-9">
        <div className="d-flex align-items-start justify-content-between">
          <div className="adminServiceTile__heading mb-2">
            <div className="adminServiceTile__heading--title">{name}</div>
            <div className="adminServiceTile__heading--date">{moment(updatedAt).format("Do MMMM, YYYY")}</div>
          </div>
          <div className="d-flex align-items-center justify-content-between adminServiceTile__icons">
            <img src={editIcon} alt="editIcon" className="mr-2" />
            <img src={deleteIcon} alt="deleteIcon" />
          </div>
        </div>
        <p className="adminServiceTile__desc">{description}</p>
      </div>
    </div>
  );
};

export default AdminServiceTile;
