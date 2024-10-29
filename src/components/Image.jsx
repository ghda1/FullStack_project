import PropTypes from "prop-types";

function Image({ image, title }) {
  return (
    <div>
      <img src={image} alt={title} />
    </div>
  );
}

Image.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
};
export default Image;
