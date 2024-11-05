import PaginationComponent from "../components/PaginationComponent";
import Products from "../components/products/Products";
import SearchInput from "../components/SearchInput";
import SortSelect from "../components/SortSelect";

function Home() {
  return (
    <>
      <div className="search-sort">
        <SearchInput />
        <SortSelect />
      </div>
      <Products />
      <PaginationComponent />
    </>
  );
}

export default Home;
