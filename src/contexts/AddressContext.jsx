import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

import { UserContext } from "./UserContext";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPagaeNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState();
  const [sortBy, setSortBy] = useState("city");
  const [sortOrder, setSortOrder] = useState("asc");
  const { token } = useContext(UserContext);

  return (
    <AddressContext.Provider
      value={{
        addresses,
        setAddresses,
        isLoading,
        setIsLoading,
        error,
        setError,
        token,
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
    </AddressContext.Provider>
  );
};

AddressProvider.propTypes = {
  children: PropTypes.node,
};
