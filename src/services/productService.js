import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_PRODUCT_URL;

export const getAllProducts = async (
  pageNumber = 1,
  pageSize = 8,
  searchQuery = "",
  sortBy = "title",
  sortOrder = "asc"
) => {
  const res = await axios(
    `${baseURL}?searchQuery=${searchQuery}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`
  );
  return res.data.data;
};

export const getSingleProduct = async (productId) => {
  const res = await axios(`${baseURL}/${productId}`);
  return res.data.data;
};
