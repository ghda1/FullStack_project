import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  return (
    <AddressContext.Provider
      value={{
        addresses,
        setAddresses,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

AddressProvider.propTypes = {
  children: PropTypes.node,
};
