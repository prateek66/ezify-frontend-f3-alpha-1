import React from "react";
import Select from "react-select";

import "./formControl.scss";

const FormControl = (props) => {
  const { id, type, label, isMandatory, onChange, validators, disabled, value, options, formik, defaultValue, rows } = props;

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
    <div className={`formControl ${!formik ? "form-group" : null}`}>
      <label htmlFor={id} id={`label-${id}`} className="formControl-label">
        {isMandatory ? "* " : null}
        {label}
      </label>

      <div>
        {(type === "input" || type === "email") && (
          <input
            className="form-control formControl-input"
            id={id}
            onFocus={onFocus}
            onBlur={onFocusOut}
            onChange={onChange}
            {...validators}
            disabled={disabled}
            value={value}
          />
        )}

        {type === "textarea" && (
          <textarea
            className="form-control formControl-input"
            id={id}
            onFocus={onFocus}
            onBlur={onFocusOut}
            onChange={onChange}
            {...validators}
            disabled={disabled}
          ></textarea>
        )}

        {type === "select" && <Select id={id} options={options} onFocus={onFocus} onBlur={onFocusOut} onChange={onChange} />}

        {type === "input-formik" && (
          <>
            <input id={id} type="text" className="form-control formControl-input" {...formik.getFieldProps(id)} />
            <small className="text-danger errorMsg">{formik.touched[id] && formik.errors[id] ? formik.errors[id] : ""}</small>
          </>
        )}

        {type === "select-formik" && (
          <>
            <Select id={id} options={options} defaultValue={defaultValue} onChange={(el) => onChange(el)} />
            <small className="text-danger errorMsg">{formik.touched[id] && formik.errors[id] ? formik.errors[id] : ""}</small>
          </>
        )}

        {type === "textarea-formik" && (
          <>
            <textarea className="form-control formControl-input" rows={rows} id={id} {...formik.getFieldProps(id)}></textarea>
            <small className="text-danger errorMsg">{formik.touched[id] && formik.errors[id] ? formik.errors[id] : ""}</small>
          </>
        )}
      </div>
    </div>
  );
};

export default FormControl;
