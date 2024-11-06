import React from "react";
import PropTypes from "prop-types";

function Colors({ colors }) {
  return (
    <>
      <label>Colors:</label>
      <select className="colorSelect">
        {colors.map((color) => {
          return (
            <option key={color.colorId} value={color.colorId}>
              {color.value}
            </option>
          );
        })}
      </select>
    </>
  );
}

Colors.propTypes = {
  colors: PropTypes.array,
};

export default Colors;
