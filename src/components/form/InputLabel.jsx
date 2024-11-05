import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

function FormInput({ type, name, id, onChange, value, required }) {
  return (
    <input
      className="fieldInput"
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}
FormInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default FormInput;
