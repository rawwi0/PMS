import axios from "../../utils/axios";

export const getUsersApi = (page = 1, limit = 10) => {
  return axios.get(`/users?page=${page}&limit=${limit}`);
};
export const createUserApi = (data) => {
  return axios.post("/users", data);
};
export const deleteUserApi = (id) => {
  return axios.delete(`/users/${id}`);
};
export const updateUserApi = (id, data) => {
  return axios.put(`/users/${id}`, data);
};
