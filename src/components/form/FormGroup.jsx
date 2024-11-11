import React from "react";
import PropTypes from "prop-types";

import FormError from "./FormError";
import FormLabel from "./FormLabel";
import FormInput from "./FormInput";

function FormGroup({
  id,
  label,
  name,
  type,
  value,
  accept,
  src,
  title,
  onChange,
  required,
  error,
}) {
  return (
    <div className="groupForm">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {src && <img src={src} title={title}></img>}
      <FormInput
        id={id}
        name={name}
        type={type}
        value={value}
        accept={accept}
        onChange={onChange}
        required={required}
      />
      {error && <FormError error={error} />}
    </div>
  );
}

FormGroup.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  accept: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.string,
};

export default FormGroup;
