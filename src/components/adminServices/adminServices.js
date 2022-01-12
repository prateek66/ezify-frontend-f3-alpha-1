import React, { useState } from "react";
import ModalBase from "../atmoic/modal/modal";
import ServiceForm from "../serviceForm/serviceForm";

import AdminServiceTile from "./../adminServiceTile/adminServiceTile";

import "./adminServices.scss";

const AdminServices = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="adminServices container">
        <div className="adminServices__header d-flex align-items-center justify-content-between">
          <h2>You have got 8 Services</h2>
          <span onClick={() => setShow(true)}>Add New Service</span>
        </div>
        <div className="adminServices__body">
          <AdminServiceTile />
          <AdminServiceTile />
          <AdminServiceTile />
          <AdminServiceTile />
        </div>
      </div>

      <ModalBase show={show} size="lg" >
        <ServiceForm setShow={setShow} />
      </ModalBase>
    </>
  );
};

export default AdminServices;
