import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isLogIn, setLogIn] = useState((userData && userData.isLogIn) || false);
  const [token, setToken] = useState((userData && userData.token) || null);
  const [userLoggedIn, setUserLoggedIn] = useState(
    (userData && userData.userData) || null
  );

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setLogIn(userData.isLogIn);
      setToken(userData.token);
      setUserLoggedIn(userData.userData);
    }
  }, []);

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
        setUserLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};
