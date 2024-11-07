import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signUpFields } from "../components/user/signUpFields";
import FormGroup from "../components/form/FormGroup";
import FormButton from "../components/form/FormButton";
import { registerUser } from "../services/userService";

export default function Signup() {
  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    isAdmin: false,
  };

  const [user, setUser] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handelAddUser = async (newUser) => {
    const res = await registerUser(newUser);
    return res;
  };

  const isValidateForm = () => {
    const newErrors = {};
    if (!user.firstName.trim()) newErrors.firstName = "First Name is required";
    if (user.firstName.length < 3)
      newErrors.firstName = "First Name should be at least 3 characters long";
    if (!user.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (user.lastName.length < 3)
      newErrors.lastName = "Last Name should be at least 3 characters long";
    if (!user.email) newErrors.email = "User email is required";
    if (user.email.length < 10)
      newErrors.email = "User email should be at least 10 characters long";
    if (!user.password.trim()) newErrors.password = "User password is required";
    if (user.password.length < 7)
      newErrors.password = "User password should be at least 7 characters long";
    if (!user.phone.trim()) newErrors.phone = "User phone is required";
    if (user.phone.length != 10)
      newErrors.phone = "Phone  number should be exactly 10 characters long";

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
      const newUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        phone: user.phone,
        isAdmin: false,
      };
      const res = await handelAddUser(newUser);
      restValues();
      navigate("/addressInfo", { state: res });
    }
  };
  return (
    <div className="signUpForm">
      <h2 className="signUpTitle">Sign Up</h2>
      <p className="welcoming">Welcome, please sign up to join us</p>
      <form className="form" onSubmit={submitHandler}>
        {signUpFields.map((field) => {
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
        <FormButton type="submit">Sign Up</FormButton>
      </form>
    </div>
  );
}
