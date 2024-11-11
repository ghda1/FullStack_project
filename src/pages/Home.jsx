import { useContext } from "react";
import PaginationComponent from "../components/PaginationComponent";
import Products from "../components/products/Products";
import SearchInput from "../components/SearchInput";
import SortSelect from "../components/SortSelect";
import { ProductContext } from "../contexts/ProductContext";

function Home() {
  const { pageNumber, setPagaeNumber, totalPages } = useContext(ProductContext);
  return (
    <>
      <div className="search-sort">
        <SearchInput />
        <SortSelect />
      </div>
      <Products />
      <PaginationComponent
        pageNumber={pageNumber}
        setPagaeNumber={setPagaeNumber}
        totalPages={totalPages}
      />
    </>
  );
}

export default Home;
