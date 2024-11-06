import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import FormGroup from "../components/form/FormGroup";
import FormButton from "../components/form/FormButton";
import { addAddress } from "../services/addressService";
import { addressFields } from "../components/address/addressFieldes";

export default function AddressSignUp() {
  const userIdState = useLocation();

  const initialValue = {
    addressName: "",
    streetNumber: "",
    streetName: "",
    city: "",
    state: "",
    userId: userIdState.state.data.userId,
  };

  const [address, setAddress] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAddress((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handelAddAddress = async (newAddress) => {
    await addAddress(newAddress);
  };

  const isValidateForm = () => {
    const newErrors = {};
    if (!address.addressName.trim())
      newErrors.addressName = "Address Name is required";
    if (address.addressName.length < 3)
      newErrors.addressName =
        "Address Name should be at least 3 characters long";
    if (!address.streetName.trim())
      newErrors.streetName = "Street Name is required";
    if (address.streetName.length < 3)
      newErrors.streetName = "Street Name should be at least 3 characters long";
    if (!address.streetNumber.trim())
      newErrors.streetNumber = "Street Number is required";
    if (address.streetNumber.length < 3)
      newErrors.streetNumber =
        "Street Number should be at least 3 characters long";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (address.city.length < 3)
      newErrors.city = "City should be at least 3 characters long";
    if (!address.state.trim()) newErrors.state = "State is required";
    if (address.state.length < 3)
      newErrors.state = "State should be at least 3 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const restValues = () => {
    setAddress(initialValue);
    setErrors({});
  };
  const submitHandler = (event) => {
    event.preventDefault();

    if (isValidateForm()) {
      const newAddress = {
        addressName: address.addressName,
        streetNumber: address.streetNumber,
        streetName: address.streetName,
        city: address.city,
        state: address.state,
        userId: userIdState.state.data.userId,
      };
      handelAddAddress(newAddress);
      restValues();
      navigate("/login");
    }
  };
  return (
    <div className="signUpForm">
      <h2 className="signUpTitle">Address Information</h2>
      <form className="form" onSubmit={submitHandler}>
        {addressFields.map((field) => {
          return (
            <FormGroup
              key={field.id}
              id={field.id}
              label={field.lable}
              name={field.name}
              type={field.type}
              value={address[field.name]}
              onChange={handleChange}
              required={field.required}
              error={errors[field.name]}
            />
          );
        })}
        <FormButton type="submit">Add</FormButton>
      </form>
    </div>
  );
}
