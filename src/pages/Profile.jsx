import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { deleteUser, getSingleUser } from "../services/userService";
import { jwtDecode } from "jwt-decode";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { error, setError, isLoading, setIsLoading, setLogIn, setToken } =
    useContext(UserContext);
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData.token;
  const decodeToken = jwtDecode(token);
  const userId = decodeToken.nameid;

  const fetchData = async (userId, token) => {
    try {
      setIsLoading(true);
      const findUser = await getSingleUser(userId, token);
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

  const handleDelteProfile = async (userId) => {
    // await deleteUser(userId, token);
    //     setLogIn(false);
    //     setToken(null);
  };
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
        <button
          className="update-btn"
          onClick={() => navigate("/updateProfile", { state: user })}
        >
          Update Profile
        </button>
        <button
          className="delet-btn"
          onClick={() => handleDelteProfile(user.userId)}
        >
          Update Profile
        </button>
      </Card>
    </Container>
  );
}

export default Profile;
