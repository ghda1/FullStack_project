import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";

import { UserContext } from "../contexts/UserContext";
import { deleteUser, getAllUsers } from "../services/userService";
import PaginationComponent from "./PaginationComponent";
import SearchInput from "./SearchInput";

function ManageUsers() {
  const {
    users,
    setUsers,
    isLoading,
    setIsLoading,
    error,
    setError,
    token,
    searchQuery,
    setSearchQuery,
    pageNumber,
    setPagaeNumber,
    pageSize,
    setPageSize,
    totalPages,
    setTotalPages,
    sortBy,
    sortOrder,
  } = useContext(UserContext);

  const fetchData = async (
    token,
    pageNumber,
    pageSize,
    searchQuery,
    sortBy,
    sortOrder
  ) => {
    try {
      setIsLoading(true);
      const usersData = await getAllUsers(
        token,
        pageNumber,
        pageSize,
        searchQuery,
        sortBy,
        sortOrder
      );
      setPagaeNumber(usersData.pageNumber);
      setPageSize(usersData.pageSize);
      setTotalPages(usersData.totalPages);
      setUsers(usersData.items);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    fetchData(token, pageNumber, pageSize, searchQuery, sortBy, sortOrder);
  }, [pageNumber, pageSize, searchQuery, sortBy, sortOrder]);

  const handleDelteUser = async (userId, token) => {
    await deleteUser(userId, token);
    const usersData = await getAllUsers(
      token,
      pageNumber,
      pageSize,
      searchQuery,
      sortBy,
      sortOrder
    );
    setUsers(usersData.items);
  };

  if (isLoading) {
    return <h2>Users are Loading...</h2>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  if (!users) {
    return <h2>There is no users</h2>;
  }

  return (
    <div className="dashboard-content">
      <h3>Manage Users</h3>
      <div className="search-sort">
        <SearchInput setSearchQuery={setSearchQuery} />
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>User ID</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>User Phone</th>
            <th>User Role</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const { userId, firstName, lastName, email, phone, isAdmin } = user;
            return (
              <tr key={userId}>
                <td>{++index}</td>
                <td>{userId}</td>
                <td>
                  {firstName} {lastName}
                </td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{isAdmin ? "Admin" : "User"}</td>
                <td>
                  <button onClick={() => handleDelteUser(userId, token)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <PaginationComponent
        pageNumber={pageNumber}
        setPagaeNumber={setPagaeNumber}
        totalPages={totalPages}
      />
    </div>
  );
}

export default ManageUsers;
