import api from "../../utils/axios";

export const getTasks = async (page = 1, limit = 10) => {
  const response = await api.get(`/tasks?page=${page}&limit=${limit}`);

  return response.data;
};

export const createTask = async (data) => {
  const response = await api.post("/tasks", data);

  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await api.put(`/tasks/${id}`, data);

  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);

  return response.data;
};
export const getProjects = async () => {
  const response = await api.get("/projects");

  return response.data;
};

export const getTask = async (id) => {
  const response = await api.get(`/tasks/${id}`);

  return response.data;
};

export const updateTaskStatus = async (id, status) => {
  const response = await api.patch(`/tasks/${id}/status`, { status });

  return response.data;
};

export const getTasksByProjectApi = async (projectId) => {
  const response = await api.get(`/tasks/project/${projectId}`);

  return response.data;
};
