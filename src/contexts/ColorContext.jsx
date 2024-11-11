import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { UserContext } from "./UserContext";
import { getAllColors } from "../services/colorService";

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useContext(UserContext);

  const fetchData = async (token) => {
    try {
      setIsLoading(true);
      const colorsData = await getAllColors(token);
      setColors(colorsData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(token);
  }, []);

  return (
    <ColorContext.Provider
      value={{
        colors,
        setColors,
        isLoading,
        setIsLoading,
        error,
        setError,
        token,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

ColorProvider.propTypes = {
  children: PropTypes.node,
};
