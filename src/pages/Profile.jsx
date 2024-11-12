import React, { useContext, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import { deleteUser, getSingleUser } from "../services/userService";
import { AddressContext } from "../contexts/AddressContext";

function Profile() {
  const {
    isLoading,
    setIsLoading,
    error,
    setError,
    setToken,
    setLogIn,
    setUserLoggedIn,
  } = useContext(UserContext);

  const { addresses } = useContext(AddressContext);

  const [user, setUser] = useState();

  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));

  const token = userData.token;

  const { userId } = useParams();

  const userAddresses = addresses.filter(
    (address) => address.user.userId === userId
  );

  const fetchData = async (userId, token) => {
    try {
      setIsLoading(true);
      const findUser = await getSingleUser(userId, token);
      setToken(token);
      setUser(findUser);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(userId, token);
  }, [userId]);

  if (isLoading) {
    return <p>User Profile is Loading...</p>;
  }
  if (!user) {
    return <p>User is not available.</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const { firstName, lastName, email, phone } = user;

  const handleDelteProfile = async (userId, token) => {
    try {
      await deleteUser(userId, token);
      setLogIn(false);
      setToken(null);
      setUserLoggedIn(null);
      localStorage.removeItem("userData");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="profileContianer">
      <Card className="profileCard">
        <img
          className="profileImage"
          src="../images/personal-photo.png"
          alt="profile picture"
        />
        <Card.Body className="profileInfo">
          <p>
            <strong>Name:</strong> {firstName} {lastName}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone Number:</strong> {phone}
          </p>

          {userAddresses?.map((address) => {
            return (
              <div key={address.addressId} className="addressBlock">
                <h3>Address</h3>
                <p>
                  <strong>Address Name:</strong> {address.addressName}
                </p>
                <p>
                  <strong>Street Name:</strong> {address.streetName}
                </p>
                <p>
                  <strong>Street Number:</strong> {address.streetNumber}
                </p>
                <p>
                  <strong>City:</strong> {address.city}
                </p>
                <p>
                  <strong>State:</strong> {address.state}
                </p>
              </div>
            );
          })}

          <div className="button-container">
            <button
              className="update-btn"
              onClick={() => navigate("/updateProfile", { state: user })}
            >
              Edit Profile
            </button>
            <button
              className="delet-btn"
              onClick={() => handleDelteProfile(user.userId, token)}
            >
              Delete Profile
            </button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
