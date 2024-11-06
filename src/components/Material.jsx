import PropTypes from "prop-types";

function Material({ material }) {
  return (
    <>
      <p className="productMaterial">Material: {material}</p>
    </>
  );
}

Material.propTypes = {
  material: PropTypes.string,
};
export default Material;
