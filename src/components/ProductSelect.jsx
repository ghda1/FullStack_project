import React from "react";
import { MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";

function ProductSelect({ required, value, onChange, options, htmlFor, label }) {
  return (
    <>
      <label htmlFor={htmlFor}>{label}</label>
      <Select
        className="product-select"
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
    </>
  );
}

ProductSelect.propTypes = {
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func,
  options: PropTypes.array,
  label: PropTypes.string,
  htmlFor: PropTypes.string,
};

export default ProductSelect;
