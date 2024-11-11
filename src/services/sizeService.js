import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_SIZE_URL;

export const getAllSizes = async (token) => {
  const res = await axios(`${baseURL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const getSingleSize = async (addressId, token) => {
  const res = await axios(`${baseURL}/${addressId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};
