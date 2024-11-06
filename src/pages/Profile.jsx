import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { getSingleUser } from "../services/userService";
import { jwtDecode } from "jwt-decode";
import { Card, Container } from "react-bootstrap";

function Profile() {
  const { error, setError, isLoading, setIsLoading } = useContext(UserContext);
  const [user, setUser] = useState();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData.token;
  const decodeToken = jwtDecode(token);
  const userId = decodeToken.nameid;

  const fetchData = async (userId, token) => {
    try {
      setIsLoading(true);
      const findUser = await getSingleUser(userId, token);
      console.log(findUser);
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
  return (
    <Container className="profileContianer">
      <Card className="profileCard">
        <img
          className="profileImage"
          src="./images/personal-photo.png"
          alt="profile picture"
        />
        <Card.Body className="profileInfo"></Card.Body>
        <h3 className="fistName">First Name: {firstName}</h3>
        <h3 className="lastName">Last Name: {lastName}</h3>
        <h3 className="email">Email: {email}</h3>
        <h3 className="phone">Phone Number: {phone}</h3>
      </Card>
    </Container>
  );
}

export default Profile;
