import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { UserContext } from "./UserContext";
import { getAllSizes } from "../services/sizeService";

export const SizeContext = createContext();

export const SizeProvider = ({ children }) => {
  const [sizes, setSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useContext(UserContext);

  const fetchData = async (token) => {
    try {
      setIsLoading(true);
      const sizesData = await getAllSizes(token);
      setSizes(sizesData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(token);
  }, []);

  return (
    <SizeContext.Provider
      value={{
        sizes,
        setSizes,
        isLoading,
        setIsLoading,
        error,
        setError,
        token,
      }}
    >
      {children}
    </SizeContext.Provider>
  );
};

SizeProvider.propTypes = {
  children: PropTypes.node,
};
