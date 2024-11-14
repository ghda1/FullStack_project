import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUserFields } from "../components/user/updateUserFields";
import FormGroup from "../components/form/FormGroup";
import FormButton from "../components/form/FormButton";
import { getSingleUser, updateUser } from "../services/userService";
import PageTitle from "../components/PageTitle";

function UpdateProfile() {
  const locationState = useLocation();
  const [updateProfileData, setUpdateProfileData] = useState(
    locationState.state
  );
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { userId, firstName, lastName, email, phone } = updateProfileData;

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData.token;

  const handleChange = (event) => {
    setUpdateProfileData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleUpdateUserData = async (userId, updatedUser, token) => {
    await updateUser(userId, updatedUser, token);
    await getSingleUser(userId);
    navigate(`/products`);
  };

  const isValidateForm = () => {
    const newErrors = {};
    if (firstName.length < 3)
      newErrors.firstName = "First Name should be at least 3 characters long";
    if (lastName.length < 3)
      newErrors.lastName = "Last Name should be at least 3 characters long";
    if (email.length < 10)
      newErrors.email = "User email should be at least 10 characters long";
    if (phone.length != 10)
      newErrors.phone = "Phone  number should be exactly 10 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const restValues = () => {
    setUpdateProfileData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setErrors({});
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (isValidateForm()) {
      const updatedUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
      };
      handleUpdateUserData(userId, updatedUser, token);
      restValues();
    }
  };

  return (
    <div className="updateForm">
      <PageTitle title="Update Profile" />
      <h2 className="updateTitle">Update Profile</h2>
      <form className="form" onSubmit={submitHandler}>
        {updateUserFields.map((field) => {
          return (
            <FormGroup
              key={field.id}
              id={field.id}
              label={field.lable}
              name={field.name}
              type={field.type}
              value={updateProfileData[field.name]}
              onChange={handleChange}
              required={field.required}
              error={errors[field.name]}
            />
          );
        })}
        <FormButton type="submit">Update</FormButton>
      </form>
    </div>
  );
}

export default UpdateProfile;
