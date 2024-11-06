import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_PRODUCT_URL;

export const getAllProducts = async (
  pageNumber = 1,
  pageSize = 8,
  searchQuery = "",
  sortBy = "title",
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
  const res = await axios(`${baseURL}?${params.toString()}`);
  return res.data.data;
};

export const getSingleProduct = async (productId) => {
  const res = await axios(`${baseURL}/${productId}`);
  return res.data.data;
};
