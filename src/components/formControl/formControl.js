import React from "react";

import "./formControl.scss";

const FormControl = (props) => {
  const { id, type, label, isMandatory } = props;

  const onFocus = () => {
    const inputLabel = document.getElementById(`label-${id}`);
    const input = document.getElementById(`${id}`);
    inputLabel.style.color = "#09b162";
    input.style.borderColor = "#09b162";
    input.style.boxShadow = "none";
  };

  const onFocusOut = () => {
    const inputLabel = document.getElementById(`label-${id}`);
    const input = document.getElementById(`${id}`);
    inputLabel.style.color = "#30334f";
    input.style.borderColor = "#30334f";
    input.style.boxShadow = "none";
  };

  return (
    <div className="form-group formControl">
      <label htmlFor={id} id={`label-${id}`} className="formControl-label">
        {isMandatory ? "*" : null}
        {label}
      </label>

      <div>{type === "input" && <input className="form-control formControl-input" id={id} onFocus={onFocus} onBlur={onFocusOut} />}</div>
    </div>
  );
};

export default FormControl;
