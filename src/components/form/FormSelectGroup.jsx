import React from "react";
import PropTypes from "prop-types";

import FormError from "./FormError";
import FormLabel from "./FormLabel";
import FormSelect from "./FormSelect";
function FormSelectGroup({
  id,
  lable,
  required,
  value,
  onChange,
  options,
  error,
}) {
  return (
    <div className="groupForm">
      <FormLabel htmlFor={id}>{lable}</FormLabel>
      <FormSelect
        required={required}
        value={value}
        onChange={onChange}
        options={options}
      ></FormSelect>
      {error && <FormError message={error} />}
    </div>
  );
}
FormSelectGroup.propTypes = {
  lable: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.array,
  onChange: PropTypes.func,
  options: PropTypes.array,
  error: PropTypes.string,
};
export default FormSelectGroup;
