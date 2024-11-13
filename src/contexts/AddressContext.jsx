import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllAddresses } from "../services/addressService";
import { UserContext } from "./UserContext";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

AddressProvider.propTypes = {
  children: PropTypes.node,
};
