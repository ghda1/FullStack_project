import React, { useContext } from "react";
import Products from "../components/products/Products";
import { ProductContext } from "../contexts/ProductContext";

function Home() {
  const { setSearchQuery, isLoading } = useContext(ProductContext);

  if (isLoading) {
    return <h2>Products is Loading...</h2>;
  }

  const handleSearching = (event) => {
    event.preventDefault();
    setTimeout(() => {
      const searchTerm = event.target.value.toLowerCase();
      setSearchQuery(searchTerm);
    }, 2000);
  };

  return (
    <>
      <div className="srearch-div">
        <input
          className="search"
          type="text"
          id="search-task"
          placeholder="Search for product.."
          onChange={handleSearching}
        />
      </div>
      <Products />
    </>
  );
}

export default Home;
