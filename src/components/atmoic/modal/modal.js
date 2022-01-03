import React from "react";
import { Modal } from "react-bootstrap";

const ModalBase = ({ show, handleClose, children, dialogClassName }) => {
  return (
    <Modal show={show} centered backdrop="static" dialogClassName={`custom-modal ${dialogClassName}`} keyboard={false} onHide={handleClose}>
      {children}
    </Modal>
  );
};

export default ModalBase;
