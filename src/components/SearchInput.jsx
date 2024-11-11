import PropTypes from "prop-types";

function SearchInput({ setSearchQuery }) {
  const handleSearching = (event) => {
    event.preventDefault();
    setTimeout(() => {
      const searchTerm = event.target.value.toLowerCase();
      setSearchQuery(searchTerm);
    }, 500);
  };
  return (
    <div className="srearch-div">
      <input
        className="search"
        type="text"
        id="search-task"
        placeholder="Search for product.."
        onChange={handleSearching}
      />
    </div>
  );
}
SearchInput.propTypes = {
  setSearchQuery: PropTypes.func,
};

export default SearchInput;
