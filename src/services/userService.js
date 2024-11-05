import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_USER_URL;

export const getAllUsers = async () => {
  const res = await axios(`${baseURL}`);
  return res.data.data;
};

export const getSingleUser = async (userId) => {
  const res = await axios(`${baseURL}/${userId}`);
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
