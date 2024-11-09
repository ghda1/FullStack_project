import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import FormGroup from "../components/form/FormGroup";
import FormButton from "../components/form/FormButton";
import { UserContext } from "../contexts/UserContext";
import { logInFields } from "../components/user/logInFields";
import { logInUser } from "../services/userService";
import FormError from "../components/form/FormError";

export default function Login() {
  const initialValue = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const { setLogIn, setToken, setUserLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handelLogInUser = async (userData) => {
    const res = await logInUser(userData);
    return res.data;
  };

  const isValidateForm = () => {
    const newErrors = {};
    if (!user.email) newErrors.email = "Email is required";
    if (user.email.length < 10)
      newErrors.email = "Email should be at least 10 characters long";
    if (!user.password.trim()) newErrors.password = "User password is required";
    if (user.password.length < 7)
      newErrors.password = "User password should be at least 7 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const restValues = () => {
    setUser(initialValue);
    setErrors({});
  };
  const submitHandler = async (event) => {
    event.preventDefault();

    if (isValidateForm()) {
      const userData = {
        email: user.email,
        password: user.password,
      };
      try {
        const userToken = await handelLogInUser(userData);
        if (userToken.length != 0) {
          setLogIn(true);
          setToken(userToken);
          const decodeToken = jwtDecode(userToken);
          setUserLoggedIn(decodeToken);
          localStorage.setItem(
            "userData",
            JSON.stringify({
              userData: decodeToken,
              isLogIn: true,
              token: userToken,
            })
          );
          restValues();
          navigate("/");
        }
      } catch {
        const newErrors = {};
        newErrors.signIn = "Incorrect email or password";
        setErrors(newErrors);
      }
    }
  };
  return (
    <div className="logInForm">
      <h2 className="logInTitle">Log In</h2>
      <p className="welcoming">please sign in to continue</p>
      <form className="form" onSubmit={submitHandler}>
        {logInFields.map((field) => {
          return (
            <FormGroup
              key={field.id}
              id={field.id}
              label={field.lable}
              name={field.name}
              type={field.type}
              value={user[field.name]}
              onChange={handleChange}
              required={field.required}
              error={errors[field.name]}
            />
          );
        })}
        {errors.signIn && <FormError error={errors.signIn} />}
        <FormButton type="submit">Log In</FormButton>
        <p className="signInToSignUp">You do not have an account?</p>
        <Link className="navigateToSignUp" onClick={() => navigate("/signUp")}>
          Sign Up
        </Link>
      </form>
    </div>
  );
}
