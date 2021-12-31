import React from "react";
import "./customButton.scss";

const CustomButton = (props) => {
  const { type, text, classes } = props;
  return (
    <button type={type} className={`btn customButton ${classes}`}>
      {text}
    </button>
  );
};

export default CustomButton;
