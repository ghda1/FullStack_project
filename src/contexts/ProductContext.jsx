import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllProducts } from "../services/ProductService";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPagaeNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState();
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchData = async (
    pageNumber,
    pageSize,
    searchQuery,
    sortBy,
    sortOrder
  ) => {
    try {
      setIsLoading(true);
      const res = await getAllProducts(
        pageNumber,
        pageSize,
        searchQuery,
        sortBy,
        sortOrder
      );
      setPagaeNumber(res.pageNumber);
      setPageSize(res.pageSize);
      setTotalPages(res.totalPages);
      const productsData = res.items;
      setProducts(productsData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(pageNumber, pageSize, searchQuery, sortBy, sortOrder);
  }, [pageNumber, pageSize, searchQuery, sortBy, sortOrder]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        isLoading,
        setIsLoading,
        error,
        setError,
        searchQuery,
        setSearchQuery,
        pageNumber,
        setPagaeNumber,
        pageSize,
        setPageSize,
        totalPages,
        setTotalPages,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node,
};
