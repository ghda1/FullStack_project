import React from "react";
import PropTypes from "prop-types";

function Sizes({ sizes }) {
  return (
    <>
      <label>Sizes: </label>
      <select className="sizeSelect">
        {sizes.map((size) => {
          return (
            <option key={size.sizeId} value={size.sizeId}>
              {size.value}
            </option>
          );
        })}
      </select>
    </>
  );
}
Sizes.propTypes = {
  sizes: PropTypes.array,
};
export default Sizes;
