import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_ADDRESS_URL;

export const getAllAddresses = async () => {
  const res = await axios(`${baseURL}`);
  return res.data.data;
};

export const getSingleAddress = async (addressId) => {
  const res = await axios(`${baseURL}/${addressId}`);
  return res.data.data;
};

export const addAddress = async (addressData) => {
  const res = await axios.post(`${baseURL}`, addressData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
