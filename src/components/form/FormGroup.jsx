import React from "react";
import PropTypes from "prop-types";

import InputLabel from "./InputLabel";
import FormError from "./FormError";
import FormLabel from "./FormLabel";

function FormGroup({
  id,
  label,
  name,
  type,
  value,
  onChange,
  required,
  error,
}) {
  return (
    <div className="groupForm">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <InputLabel
        id={id}
        name={name}
        type={type}
        value={value}
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
  onChange: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.string,
};

export default FormGroup;
