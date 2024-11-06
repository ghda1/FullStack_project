import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_USER_URL;

export const getAllUsers = async () => {
  const res = await axios(`${baseURL}`);
  return res.data.data;
};

export const getSingleUser = async (userId, token) => {
  const res = await axios(`${baseURL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const registerUser = async (userData) => {
  const res = await axios.post(`${baseURL}/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const logInUser = async (userData) => {
  const res = await axios.post(`${baseURL}/login`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
