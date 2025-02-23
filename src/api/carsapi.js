import axios from "axios";

const baseURL = "http://localhost:3000/products";

const getAllProducts = () => axios.get(baseURL);
const getProductById = (productId) => axios.get(`${baseURL}/${productId}`);
const addNewProduct = (product) => axios.post(baseURL, product);
const deleteProductAPI = (productId) => axios.delete(`${baseURL}/${productId}`);
const editProduct = (productId, product) =>
  axios.put(`${baseURL}/${productId}`, product);

export {
  getAllProducts,
  getProductById,
  addNewProduct,
  deleteProductAPI,
  editProduct,
};
