import React, { useEffect } from "react";
import { Toast } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setToasterConfig } from "../../../redux/toaster/toaster.actions";
import { selectToasterInfo } from "../../../redux/toaster/toaster.selectors";

const Toaster = ({ toasterConfig, setToasterCofig }) => {
  useEffect(() => {
    setTimeout(() => {
      const config = {
        show: false,
        message: null,
      };

      setToasterCofig(config);
    }, 3000);
  }, []);

  return (
    <Toast
      show={toasterConfig.show}
      delay={3000}
      autohide
      style={{
        position: "absolute",
        bottom: "25px",
        right: "25px",
      }}
    >
      <Toast.Body>{toasterConfig.message}</Toast.Body>
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
