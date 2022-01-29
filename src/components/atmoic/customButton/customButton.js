import React from "react";
import "./customButton.scss";

const CustomButton = (props) => {
  const { type, text, classes, modelAttributes, onClick, disabled } = props;
  return (
    <button type={type} className={`btn customButton ${classes}`} disabled={disabled} {...modelAttributes} onClick={onClick}>
      {text}
    </button>
  );
};

export default CustomButton;
