import PropTypes from "prop-types";

function Image({ image, title }) {
  return (
    <>
      <img src={image} alt={title} />
    </>
  );
}

Image.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
};
export default Image;
