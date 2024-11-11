import { MenuItem, OutlinedInput, Select } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

function FormSelect({ required, value, onChange, options }) {
  return (
    <Select
      className="product-select"
      multiple
      required={required}
      value={value}
      onChange={onChange}
    >
      {options.map((o) => (
        <MenuItem key={o.value} value={o.value}>
          {o.label}
        </MenuItem>
      ))}
    </Select>
  );
}

FormSelect.propTypes = {
  required: PropTypes.bool,
  value: PropTypes.array,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

export default FormSelect;
