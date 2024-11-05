import React from "react";
import PropTypes from "prop-types";

function FormButton({ type, children }) {
  return <button type={type}>{children}</button>;
}

FormButton.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
};
export default FormButton;
