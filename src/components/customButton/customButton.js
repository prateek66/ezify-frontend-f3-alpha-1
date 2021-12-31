import React from "react";
import "./customButton.scss";

const CustomButton = (props) => {
  const { type, text, classes, modelAttributes } = props;
  return (
    <button type={type} className={`btn customButton ${classes}`} {...modelAttributes} data-toggle="modal" data-target="#staticBackdrop">
      {text}
    </button>
  );
};

export default CustomButton;
