import axios from "axios";

export const getAllProducts = async (searchQuery) => {
  console.log(searchQuery);
  const res = await axios(
    `http://localhost:5125/api/v1/products?searchQuery=${searchQuery}`
  );
  return res.data.data;
};

export const getSingleProduct = async (productId) => {
  const res = await axios(`http://localhost:5125/api/v1/products/${productId}`);
  console.log(res.data.data);
  return res.data.data;
};
