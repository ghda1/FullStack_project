import PropTypes from "prop-types";

function Image({ image, title }) {
  return (
    <>
      <img className="productImage" src={image} alt={title} />
    </>
  );
}

Image.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
};
export default Image;
