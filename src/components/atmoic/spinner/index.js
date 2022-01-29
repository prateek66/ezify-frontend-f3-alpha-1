import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSpinnerInfo } from "../../../redux/spinner/spinner.selectors";

import "./spinner.scss";

const CustomSpinner = ({ show }) => {
  useEffect(() => {
    if (show) {
      document.body.classList.add("custom-overflow");
    } else {
      document.body.classList.remove("custom-overflow");
    }
  }, [show]);

  return (
    <>
      {show && (
        <div className="CustomSpinner">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  show: selectSpinnerInfo,
});

export default connect(mapStateToProps)(CustomSpinner);
