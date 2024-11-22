import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_ADDRESS_URL;

export const getAllAddresses = async (
  token,
  pageNumber = 1,
  pageSize = 8,
  searchQuery = "",
  sortBy = "city",
  sortOrder = "asc"
) => {
  const params = new URLSearchParams();

  params.append("pageNumber", pageNumber);
  params.append("pageSize", pageSize);

  if (searchQuery) {
    params.append("searchQuery", searchQuery);
  }
  if (sortBy) {
    params.append("sortBy", sortBy);
  }
  if (sortOrder) {
    params.append("sortOrder", sortOrder);
  }
  const res = await axios(`${baseURL}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const getSingleAddress = async (addressId, token) => {
  const res = await axios(`${baseURL}/${addressId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

export const deleteAddress = async (addressId, token) => {
  const res = await axios.delete(`${baseURL}/${addressId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
