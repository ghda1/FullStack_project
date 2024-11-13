import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";

import { AddressContext } from "../contexts/AddressContext";
import { deleteAddress, getAllAddresses } from "../services/addressService";

function ManageAddresses() {
  const {
    addresses,
    setAddresses,
    isLoading,
    setIsLoading,
    error,
    setError,
    token,
  } = useContext(AddressContext);

  const fetchData = async (token) => {
    try {
      setIsLoading(true);
      const addressData = await getAllAddresses(token);
      setAddresses(addressData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(token);
  }, []);

  console.log(addresses);

  const handleDelteAddress = async (addressId, token) => {
    await deleteAddress(addressId, token);
    const addresses = await getAllAddresses();
    setAddresses(addresses);
  };

  if (isLoading) {
    return <h2>Addresses are Loading...</h2>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  if (!addresses) {
    return <h2>There is no addresses</h2>;
  }

  return (
    <div className="dashboard-content">
      <h3>Manage Users Addresses</h3>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Address ID</th>
            <th>User Name</th>
            <th>Address Name</th>
            <th>Street Name</th>
            <th>Street Number</th>
            <th>City</th>
            <th>State</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address, index) => {
            const {
              addressId,
              addressName,
              streetName,
              streetNumber,
              city,
              state,
              user,
            } = address;
            return (
              <tr key={addressId}>
                <td>{++index}</td>
                <td>{addressId}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{addressName}</td>
                <td>{streetName}</td>
                <td>{streetNumber}</td>
                <td>{city}</td>
                <td>{state}</td>
                <td>
                  <button onClick={() => handleDelteAddress(addressId, token)}>
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

export default ManageAddresses;
