import React from "react";
import PropTypes from "prop-types";

function InputLabel({ htmlFor, children }) {
  return <label htmlFor={htmlFor}>{children}</label>;
}
InputLabel.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node,
};
export default InputLabel;
