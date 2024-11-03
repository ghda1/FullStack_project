import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllProducts } from "../services/ProductService";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async (searchQuery) => {
    try {
      setIsLoading(true);
      const res = await getAllProducts(searchQuery);
      const productsData = res;
      setProducts(productsData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);

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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node,
};
