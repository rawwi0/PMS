import api from "../../utils/axios";

export const getProjects = async (page = 1, limit = 10) => {
  const response = await api.get(`/projects?page=${page}&limit=${limit}`);

  return response.data;
};

export const createProject = async (data) => {
  const response = await api.post("/projects", data);

  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await api.put(`/projects/${id}`, data);

  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);

  return response.data;
};

export const getDepartments = async () => {
  const response = await api.get("/departments");

  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/users");

  return response.data;
};

export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);

  return response.data;
};
