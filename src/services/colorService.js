import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_COLOR_URL;

export const getAllColors = async (token) => {
  const res = await axios(`${baseURL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const getSingleColor = async (addressId, token) => {
  const res = await axios(`${baseURL}/${addressId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};
