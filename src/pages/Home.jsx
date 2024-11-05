import PaginationComponent from "../components/PaginationComponent";
import Products from "../components/products/Products";
import SearchInput from "../components/SearchInput";
import Sorting from "../components/Sorting";

function Home() {
  return (
    <>
      <div className="search-sort">
        <SearchInput />
        <Sorting />
      </div>
      <Products />
      <PaginationComponent />
    </>
  );
}

export default Home;
