import React from "react";
import { Toast } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setToasterConfig } from "../../../redux/toaster/toaster.actions";
import { selectToasterInfo } from "../../../redux/toaster/toaster.selectors";

import "./toaster.scss";

const Toaster = ({ toasterConfig, setToasterCofig }) => {
  const onClose = () => {
    setToasterCofig({
      show: false,
      message: null,
      className: null,
    });
  };

  return (
    <Toast className="toaster" show={toasterConfig.show} delay={3000} autohide={true} onClose={onClose}>
      <Toast.Body className={toasterConfig.className}>{toasterConfig.message}</Toast.Body>
    </Toast>
  );
};

const mapStateToProps = createStructuredSelector({
  toasterConfig: selectToasterInfo,
});

const mapDispatchToProps = (dispatch) => ({
  setToasterCofig: (config) => dispatch(setToasterConfig(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toaster);
