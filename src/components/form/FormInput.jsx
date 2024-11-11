import React from "react";
import PropTypes from "prop-types";

function FormInput({ type, name, id, onChange, value, accept, required }) {
  return type === "file" ? (
    <input
      className="fieldInput"
      type={type}
      id={id}
      name={name}
      onChange={onChange}
      accept={accept}
      required={required}
    />
  ) : (
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
  accept: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default FormInput;
