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

  const fetchData = async (token) => {
    try {
      setIsLoading(true);
      const res = await getAllAddresses(token);
      const addressData = res;
      setAddresses(addressData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(token);
  }, []);

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
