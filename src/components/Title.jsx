import PropTypes from "prop-types";

function Title({ title }) {
  return (
    <>
      <h3 className="productTitle">{title}</h3>
    </>
  );
}

Title.propTypes = {
  title: PropTypes.string,
};
export default Title;
