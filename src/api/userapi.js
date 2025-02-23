
// import axios from "axios";

// const baseURL = "http://localhost:3000/users";

// const getAllUsers = () => axios.get(baseURL);
// const addNewUser = (user) =>
//   axios.post(baseURL, user, {
//     headers: { "Content-Type": "application/json" },
//   });
// const deleteUserAPI = (userId) => axios.delete(`${baseURL}/${userId}`);
// const editUser = (userId, user) =>
//   axios.put(`${baseURL}/${userId}`, user, {
//     headers: { "Content-Type": "application/json" },
//   });

// export { getAllUsers, addNewUser, deleteUserAPI, editUser };

import axios from "axios";

const baseURL = "http://localhost:3000/users";

const getAllUsers = () => axios.get(baseURL);
const addNewUser = (user) =>
  axios.post(baseURL, user, {
    headers: { "Content-Type": "application/json" },
  });
const deleteUserAPI = (userId) => axios.delete(`${baseURL}/${userId}`);
const editUser = (userId, user) =>
  axios.put(`${baseURL}/${userId}`, user, {
    headers: { "Content-Type": "application/json" },
  });

export { getAllUsers, addNewUser, deleteUserAPI, editUser };