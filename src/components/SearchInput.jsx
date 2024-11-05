import { useContext } from "react";

import { ProductContext } from "../contexts/ProductContext";

function SearchInput() {
  const { setSearchQuery } = useContext(ProductContext);

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

export default SearchInput;
