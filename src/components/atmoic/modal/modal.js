import React from "react";
import { Modal } from "react-bootstrap";

const ModalBase = ({ show, handleClose, children, dialogClassName, size }) => {
  return (
    <Modal
      show={show}
      size={size}
      centered
      backdrop="static"
      dialogClassName={`custom-modal ${dialogClassName}`}
      keyboard={false}
      onHide={handleClose}
    >
      {children}
    </Modal>
  );
};

export default ModalBase;
