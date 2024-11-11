import React, { useContext } from "react";
import { Table } from "react-bootstrap";

import { UserContext } from "../contexts/UserContext";
import { deleteUser, getAllUsers } from "../services/userService";

function ManageUsers() {
  const { users, setUsers, isLoading, error, token } = useContext(UserContext);

  const handleDelteUser = async (userId, token) => {
    await deleteUser(userId, token);
    const usersData = await getAllUsers();
    setUsers(usersData);
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
    <div>
      <h3>Manage Users</h3>
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
    </div>
  );
}

export default ManageUsers;
