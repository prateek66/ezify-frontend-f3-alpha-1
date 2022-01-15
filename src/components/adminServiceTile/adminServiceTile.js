import React, { useContext, useState } from "react";

import ModalBase from "../atmoic/modal/modal";

import "./adminServiceTile.scss";

import deleteIcon from "./../../assets/profile/deleteIcon.svg";
import editIcon from "./../../assets/profile/edit-icon.svg";
import ConfirmationPopup from "../atmoic/confirmationPopup";
import { catchHandler } from "../../utlis/catchHandler.utlis";
import { ApiCallsContext } from "../../services/api.service";
import { API_URLS } from "../../utlis/constants";
import { createStructuredSelector } from "reselect";
import { selectToken } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { setToasterConfig } from "../../redux/toaster/toaster.actions";

const moment = require("moment");

const AdminServiceTile = ({ _id, image, name, updatedAt, description, userToken, setToasterCofig, removeService }) => {
  const ApiContext = useContext(ApiCallsContext);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleServiceDelete = async () => {
    const response = await catchHandler(deleteServiceAPI);

    removeService(_id);

    setToasterCofig({
      show: true,
      message: "Service deleted successfully",
      className: "success",
    });

    setShowDeletePopup(false);

    console.log(response);
  };

  const deleteServiceAPI = async () => {
    const path = `${API_URLS.DELETE_SERVICE}/${_id}`;

    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    const data = await ApiContext.deleteData(path, { headers });
    return data;
  };

  return (
    <>
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
              <img src={deleteIcon} alt="deleteIcon" onClick={() => setShowDeletePopup(true)} />
            </div>
          </div>
          <p className="adminServiceTile__desc">{description}</p>
        </div>
      </div>

      <ModalBase show={showDeletePopup} size="md" handleClose={() => setShowDeletePopup(false)}>
        <ConfirmationPopup
          message={"Do you want to delete this service?"}
          handleClose={() => setShowDeletePopup(false)}
          handleYes={handleServiceDelete}
        />
      </ModalBase>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  userToken: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
  setToasterCofig: (config) => dispatch(setToasterConfig(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminServiceTile);
