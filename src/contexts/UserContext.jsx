import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogIn, setLogIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        isLoading,
        setIsLoading,
        error,
        setError,
        isLogIn,
        setLogIn,
        token,
        setToken,
        userLoggedIn,
        setUserLoggedIn
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};
