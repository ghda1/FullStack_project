import PropTypes from "prop-types";

function Price({ price }) {
  return (
    <>
      <h4 className="productPrice">Price: {price} SAR</h4>
    </>
  );
}

Price.propTypes = {
  price: PropTypes.number,
};
export default Price;
