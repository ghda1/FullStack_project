import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllUsers } from "../services/userService";

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
  const [role, setRole] = useState((userLoggedIn && userLoggedIn.role) || null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setLogIn(userData.isLogIn);
      setToken(userData.token);
      setUserLoggedIn(userData.userData);
      setRole(userLoggedIn.role);
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
        role,
        setRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};
