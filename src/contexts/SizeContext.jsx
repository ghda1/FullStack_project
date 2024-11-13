import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getAllSizes } from "../services/sizeService";

export const SizeContext = createContext();

export const SizeProvider = ({ children }) => {
  const [sizes, setSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const sizesData = await getAllSizes();
      setSizes(sizesData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
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
      }}
    >
      {children}
    </SizeContext.Provider>
  );
};

SizeProvider.propTypes = {
  children: PropTypes.node,
};
