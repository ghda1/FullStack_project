import React from "react";
import PropTypes from "prop-types";

function FormError({ error }) {
  return <p className="errors">{error}</p>;
}

FormError.propTypes = {
  error: PropTypes.string,
};
export default FormError;
