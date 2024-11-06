import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllUsers } from "../services/userService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogIn, setLogIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getAllUsers();
      const usersData = res;
      setUsers(usersData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
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
